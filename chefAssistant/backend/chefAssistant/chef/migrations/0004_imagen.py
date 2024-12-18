# Generated by Django 4.2.16 on 2024-11-30 20:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chef', '0003_proveedor'),
    ]

    operations = [
        migrations.CreateModel(
            name='Imagen',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categoria', models.CharField(choices=[('restaurante', 'Restaurante'), ('platos', 'Platos'), ('cocina', 'Cocina')], max_length=50)),
                ('imagen', models.ImageField(upload_to='galeria/')),
            ],
        ),
    ]
