
-- Insertar categorías (asociadas al usuario 65179dc3-e27e-4792-80ec-9ffdeb01272a)
INSERT INTO public.categories ( owner, name) VALUES
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Electrónica'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Fotografía'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Audio'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Audio Profesional'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Wearables'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Deportes'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Videojuegos'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Periféricos'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Almacenamiento'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Redes'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Mobiliario'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Videoconferencia'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Accesorios'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Accesorios'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Televisores'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Hogar Inteligente'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Limpieza'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Entretenimiento'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Electrodomésticos'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Deportes'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Accesorios Deportivos'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Drones'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Libros Tecnología'),
('65179dc3-e27e-4792-80ec-9ffdeb01272a', 'Herramientas')
ON CONFLICT (id) DO UPDATE SET
    owner = EXCLUDED.owner,
    name = EXCLUDED.name,
    created_at = EXCLUDED.created_at;
    