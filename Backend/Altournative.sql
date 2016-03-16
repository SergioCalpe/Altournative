-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-03-2016 a las 19:14:37
-- Versión del servidor: 10.1.10-MariaDB
-- Versión de PHP: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `altournative`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudad`
--

CREATE TABLE `ciudad` (
  `nombre` varchar(100) COLLATE utf8_bin NOT NULL,
  `pais` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `ciudad`
--

INSERT INTO `ciudad` (`nombre`, `pais`) VALUES
('Alcoy', 'España'),
('Alicante', 'España'),
('Amsterdam', 'Holanda'),
('Barcelona', 'España'),
('Dublin', 'Irlanda'),
('Elche', 'España'),
('Madrid', 'España'),
('Novelda', 'España');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guia`
--

CREATE TABLE `guia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_bin NOT NULL,
  `apellidos` varchar(200) COLLATE utf8_bin NOT NULL,
  `dni` varchar(100) COLLATE utf8_bin NOT NULL,
  `email` varchar(100) COLLATE utf8_bin NOT NULL,
  `telefono` varchar(20) COLLATE utf8_bin NOT NULL,
  `fecha_nac` date NOT NULL,
  `ciudad` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `guia`
--

INSERT INTO `guia` (`id`, `nombre`, `apellidos`, `dni`, `email`, `telefono`, `fecha_nac`, `ciudad`) VALUES
(5, 'Danilo', 'Reis', 'danilo@ua.es', '6123456', '1999-03-06', '0000-00-00', 'Alcoy'),
(6, 'Fernando', 'Llopis', 'fer@ua.es', '6123456', '1999-03-06', '0000-00-00', 'Alcoy'),
(7, 'Pablo', 'Serrano', '74000000x', 'pablo@email.com', '698756321', '1995-05-09', 'Alcoy'),
(9, 'manuel', 'perez', '74000000x', 'manuel@email.com', '698756321', '1995-05-19', 'Madrid');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pais`
--

CREATE TABLE `pais` (
  `nombre` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `pais`
--

INSERT INTO `pais` (`nombre`) VALUES
('Australia'),
('Brasil'),
('Croacia'),
('Dinamarca'),
('España'),
('Francia'),
('Holanda'),
('Irlanda'),
('Italia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta`
--

CREATE TABLE `ruta` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) COLLATE utf8_bin NOT NULL,
  `distancia` int(11) NOT NULL,
  `duracion` int(11) NOT NULL,
  `ciudad` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `ruta`
--

INSERT INTO `ruta` (`id`, `nombre`, `distancia`, `duracion`, `ciudad`) VALUES
(1, 'Disfruta del futbol', 15, 6, 'Valencia'),
(2, 'casco antiguo', 6, 3, 'Valencia'),
(3, 'el barrio', 5, 3, 'Alicante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `apellidos` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `dni` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `login` varchar(100) COLLATE utf8_bin NOT NULL,
  `password` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellidos`, `dni`, `email`, `telefono`, `login`, `password`) VALUES
(6, 'pepe2', 'jimenez femenia', 'XXXXXXXXX', 'pepe@email.com', '666666666', 'pepepe', '81dc9bdb52d04dc20036dbd8313ed055'),
(9, 'sergio', 'jimenez femenia', 'XXXXXXXXX', 'pablo@email.com', '666666666', 'pablo', '81dc9bdb52d04dc20036dbd8313ed055'),
(11, 'sergio', 'jimenez femenia', 'XXXXXXXXX', 'perico@email.com', '666666666', 'perico', '81dc9bdb52d04dc20036dbd8313ed055'),
(12, 'sergio', 'jimenez femenia', 'XXXXXXXXX', 'hola@email.com', '666666666', 'hola', '81dc9bdb52d04dc20036dbd8313ed055'),
(13, 'sergio', 'jimenez femenia', 'XXXXXXXXX', 'manuel@email.com', '666666666', 'manuel', '81dc9bdb52d04dc20036dbd8313ed055'),
(17, 'No borrar', 'pues eso.', NULL, NULL, NULL, 'sergio', '81dc9bdb52d04dc20036dbd8313ed055'),
(18, 'kiko', 'perez', NULL, NULL, NULL, 'kik', '81dc9bdb52d04dc20036dbd8313ed055'),
(19, 'maria', 'mora', '000000000', 'maria@hotmail.com', '699999888', 'mary', '81dc9bdb52d04dc20036dbd8313ed055');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoracion`
--

CREATE TABLE `valoracion` (
  `id` int(11) NOT NULL,
  `mensaje` varchar(500) COLLATE utf8_bin NOT NULL,
  `fecha` date NOT NULL,
  `puntuacion` int(11) NOT NULL,
  `usuario` int(11) NOT NULL,
  `ruta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD PRIMARY KEY (`nombre`);

--
-- Indices de la tabla `guia`
--
ALTER TABLE `guia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`nombre`);

--
-- Indices de la tabla `ruta`
--
ALTER TABLE `ruta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `valoracion`
--
ALTER TABLE `valoracion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD UNIQUE KEY `ruta` (`ruta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `guia`
--
ALTER TABLE `guia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `ruta`
--
ALTER TABLE `ruta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT de la tabla `valoracion`
--
ALTER TABLE `valoracion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `valoracion`
--
ALTER TABLE `valoracion`
  ADD CONSTRAINT `valoracion-usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
