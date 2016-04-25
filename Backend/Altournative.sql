-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 25-04-2016 a las 20:55:58
-- Versión del servidor: 10.1.10-MariaDB
-- Versión de PHP: 5.6.19

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
-- Estructura de tabla para la tabla `ruta`
--

CREATE TABLE `ruta` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) COLLATE utf8_bin NOT NULL,
  `distancia` int(11) NOT NULL,
  `duracion` int(11) NOT NULL,
  `ciudad` varchar(100) COLLATE utf8_bin NOT NULL,
  `mapa` varchar(500) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `ruta`
--

INSERT INTO `ruta` (`id`, `nombre`, `distancia`, `duracion`, `ciudad`, `mapa`) VALUES
(1, 'Disfruta del futbol', 15, 6, 'Alicante', '<iframe class="ruta" src="https://www.google.com/maps/d/embed?mid=1UY-ya-w5KNmU1Y59n4aDLNbmqcc"></iframe>'),
(2, 'Casco antiguo', 6, 3, 'Alicante', '<iframe class="ruta" src="https://www.google.com/maps/d/embed?mid=1ALibiNjag5wTQNFLMS3wLTFPxgo"></iframe>'),
(3, 'El barrio', 5, 3, 'Alcoy', '<iframe class="ruta" src="https://www.google.com/maps/d/embed?mid=1012475BfI2FwYrPS4NNu1eXtwII"></iframe>'),
(4, 'Palmeral de Elche', 23, 7, 'Elche', '<iframe class="ruta" src="https://www.google.com/maps/d/embed?mid=1PagyO9KPMYD8vlAnyxBV-H8dtG0" width="640" height="480"></iframe>'),
(5, 'Dunas de Guardamar del Segura', 23, 3, 'Guardamar', '<iframe class="maoa" src="https://www.google.com/maps/d/embed?mid=1u2xrkgMpXDyfC-ti6Kx5uQsT1BE" width="640" height="480"></iframe>');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ruta`
--
ALTER TABLE `ruta`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ruta`
--
ALTER TABLE `ruta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
