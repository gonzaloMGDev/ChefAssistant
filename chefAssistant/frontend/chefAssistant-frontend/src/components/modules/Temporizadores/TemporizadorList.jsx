import React, { useState, useEffect } from 'react';
import TemporizadorService from './TemporizadorService';
import '../../../styles/TemporizadorPage.css'; // Asegúrate de importar el CSS
import { Howl } from 'howler';

const TemporizadorList = ({ update, resetUpdate }) => {
    const [temporizadores, setTemporizadores] = useState([]);
    const [error, setError] = useState(null);
    const [timers, setTimers] = useState({}); // Manejo de temporizadores en ejecución

    useEffect(() => {
        const fetchTemporizadores = async () => {
            try {
                const data = await TemporizadorService.getTemporizadores();
                const temporizadoresConInicial = data.map((temp) => ({
                    ...temp,
                    initialMinutos: temp.minutos,
                    initialSegundos: temp.segundos,
                    isRunning: false, // Estado de ejecución por defecto
                }));
                setTemporizadores(temporizadoresConInicial);
                if (update) resetUpdate();
            } catch (err) {
                console.error('Error al obtener temporizadores:', err);
                setError('Error al cargar los temporizadores.');
            }
        };

        fetchTemporizadores();
    }, [update]);

    const playSound = () => {
        const sound = new Howl({
            src: ['/alarma.mp3'], // Ruta del archivo de audio
            volume: 1.0, // Volumen máximo
        });
        sound.play();
    };

    const handleStartStop = (id) => {
        setTemporizadores((prev) =>
            prev.map((temp) =>
                temp.id === id ? { ...temp, isRunning: !temp.isRunning } : temp
            )
        );

        if (timers[id]) {
            clearInterval(timers[id]);
            setTimers((prev) => {
                const updatedTimers = { ...prev };
                delete updatedTimers[id];
                return updatedTimers;
            });
        } else {
            const interval = setInterval(() => {
                setTemporizadores((prev) =>
                    prev.map((temp) => {
                        if (temp.id === id) {
                            if (temp.minutos === 0 && temp.segundos === 0) {
                                clearInterval(interval);
                                playSound();
                                return { ...temp, isRunning: false };
                            }

                            const newSegundos = temp.segundos === 0 ? 59 : temp.segundos - 1;
                            const newMinutos = temp.segundos === 0 ? temp.minutos - 1 : temp.minutos;

                            return { ...temp, minutos: newMinutos, segundos: newSegundos };
                        }
                        return temp;
                    })
                );
            }, 1000);

            setTimers((prev) => ({ ...prev, [id]: interval }));
        }
    };

    const handleReset = (id) => {
        clearInterval(timers[id]);
        setTimers((prev) => {
            const updatedTimers = { ...prev };
            delete updatedTimers[id];
            return updatedTimers;
        });

        setTemporizadores((prev) =>
            prev.map((temp) =>
                temp.id === id
                    ? {
                          ...temp,
                          minutos: temp.initialMinutos,
                          segundos: temp.initialSegundos,
                          isRunning: false,
                      }
                    : temp
            )
        );
    };

    const handleDelete = async (id) => {
        try {
            await TemporizadorService.deleteTemporizador(id);
            setTemporizadores((prev) => prev.filter((temp) => temp.id !== id));
            clearInterval(timers[id]);
        } catch (err) {
            console.error('Error al eliminar temporizador:', err);
            setError('No se pudo eliminar el temporizador.');
        }
    };

    return (
        <div className="temporizador-list-container">
            {error && <p>{error}</p>}
            {temporizadores.length === 0 ? (
                <p>No tienes temporizadores creados aún.</p>
            ) : (
                <ul className="temporizador-list">
                    {temporizadores.map((temporizador) => (
                        <li key={temporizador.id} className="temporizador-card">
                            <h3>{temporizador.nombre}</h3>
                            <p>
                                {String(temporizador.minutos).padStart(2, '0')}:
                                {String(temporizador.segundos).padStart(2, '0')}
                            </p>
                            <div className="temporizador-card-buttons">
                                <button
                                    className="start-button"
                                    onClick={() => handleStartStop(temporizador.id)}>
                                    {temporizador.isRunning ? 'Stop' : 'Comenzar'}
                                </button>
                                <button
                                    className="reset-button"
                                    onClick={() => handleReset(temporizador.id)}>
                                    Reset
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(temporizador.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TemporizadorList;
