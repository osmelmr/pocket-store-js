
-- Insertar categorías (asociadas al usuario e6049a28-6f16-4a31-bf77-7ac9b5453708)
INSERT INTO public.categories ( owner, name) VALUES
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Electrónica'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Fotografía'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Audio'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Audio Profesional'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Wearables'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Deportes'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Videojuegos'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Periféricos'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Almacenamiento'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Redes'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Mobiliario'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Videoconferencia'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Accesorios'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Accesorios'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Televisores'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Hogar Inteligente'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Limpieza'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Entretenimiento'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Electrodomésticos'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Deportes'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Accesorios Deportivos'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Drones'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Libros Tecnología'),
('e6049a28-6f16-4a31-bf77-7ac9b5453708', 'Herramientas')
ON CONFLICT (id) DO UPDATE SET
    owner = EXCLUDED.owner,
    name = EXCLUDED.name,
    created_at = EXCLUDED.created_at;
    