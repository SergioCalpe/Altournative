-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 26-04-2016 a las 11:11:03
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
  `ciudad` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `foto` varchar(500) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `guia`
--

INSERT INTO `guia` (`id`, `nombre`, `apellidos`, `dni`, `email`, `telefono`, `fecha_nac`, `ciudad`, `foto`) VALUES
(5, 'Paca', 'Suarez Ronaldo', '6123456F', 'paquita@ua.es', '612349245', '1999-03-04', 'Alicante', 'https://www.genesis-mining.com/img/Version3/gm-aboutus-jana-eichhorn@2x.jpg'),
(6, 'Fernando', 'Llopis', '6123456A', 'fer@ua.es', '698258121', '2015-11-09', 'Alcoy', 'https://www.genesis-mining.com/img/Version3/gm-aboutus-marco-streng@2x.jpg'),
(7, 'Pablo', 'Serrano', '74000000x', 'pablo@email.com', '698756321', '1995-05-09', 'Guardamar', 'https://www.genesis-mining.com/img/Version3/gm-aboutus-marco-streng@2x.jpg'),
(23, 'Héctor', 'Sansano Miralles', '743720222D', 'sansanomiralles@gmail.com', '610608242', '1992-06-05', 'Elche', 'https://www.genesis-mining.com/img/Version3/gm-aboutus-marco-streng@2x.jpg'),
(24, 'Pepe', 'Sánchez', '87834234P', 'psan@gmail.com', '623467822', '1992-05-05', 'Zaragoza', 'https://www.genesis-mining.com/img/Version3/gm-aboutus-marco-streng@2x.jpg'),
(25, 'Daniel', 'Rodriguez', '983451456D', 'rodriguez@gmail.com', '671234098', '2016-03-14', 'Albacete', 'https://www.genesis-mining.com/img/Version3/gm-aboutus-marco-streng@2x.jpg');

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
(13, 'sergio 2', 'jimenez femenia', 'XXXXXXXXX', 'manuel@email.com', '666666666', 'manuel', '81dc9bdb52d04dc20036dbd8313ed055'),
(17, 'Sergio', 'Perez Sansano', NULL, 'sergiojimenezfemenia90@gmail.com', '610543981', 'sergio', '81dc9bdb52d04dc20036dbd8313ed055'),
(19, 'Maria', 'Mora Perez', '000000000', 'maria@hotmail.com', '699999888', 'mary', '81dc9bdb52d04dc20036dbd8313ed055'),
(32, 'Juan ', 'Perez Sanchez', '74373245A', 'juan.sancez@email.com', '614543823', 'juan', '1234');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT de la tabla `ruta`
--
ALTER TABLE `ruta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
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
