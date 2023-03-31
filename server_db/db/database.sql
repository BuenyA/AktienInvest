-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: maria_db
-- Erstellungszeit: 31. Mrz 2023 um 16:31
-- Server-Version: 10.11.2-MariaDB-1:10.11.2+maria~ubu2204
-- PHP-Version: 8.1.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `aktieninvestdb`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ACCOUNT`
--

CREATE TABLE `ACCOUNT` (
  `ACCOUNT_ID` int(11) NOT NULL,
  `ANREDE` varchar(256) NOT NULL,
  `VORNAME` varchar(256) NOT NULL,
  `NACHNAME` varchar(256) NOT NULL,
  `STRASSE` varchar(256) DEFAULT NULL,
  `HAUSNUMMER` varchar(11) DEFAULT NULL,
  `PLZ` varchar(5) DEFAULT NULL,
  `STADT` varchar(256) DEFAULT NULL,
  `SPIELERNAME` varchar(256) NOT NULL,
  `EMAIL` varchar(256) NOT NULL,
  `PASSWORT` varchar(256) NOT NULL,
  `KONTOSTAND` decimal(11,2) NOT NULL DEFAULT 3000.00,
  `ERSTELLT_AM` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `ACCOUNT`
--

INSERT INTO `ACCOUNT` (`ACCOUNT_ID`, `ANREDE`, `VORNAME`, `NACHNAME`, `STRASSE`, `HAUSNUMMER`, `PLZ`, `STADT`, `SPIELERNAME`, `EMAIL`, `PASSWORT`, `KONTOSTAND`, `ERSTELLT_AM`) VALUES
(15, 'frau', 'testfau', 'nachnametest', 'null', 'null', 'null', 'null', 'player1', 'player1@web.de', '$2a$10$FwhCBvtEx7Uaak/YGc2EZOg44pgYJV0pTRF2QeMZT14SVfYbHWjy2', 3000.00, '2023-03-31 16:29:02');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `AKTIE`
--

CREATE TABLE `AKTIE` (
  `AKTIE_ID` int(11) NOT NULL,
  `AKTIE_NAME` varchar(255) NOT NULL,
  `API_AKTIE_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `AKTIENDEPOT`
--

CREATE TABLE `AKTIENDEPOT` (
  `AKTIENDEPOT_ID` int(11) NOT NULL,
  `ACCOUNT_ID` int(11) NOT NULL,
  `ERSTELLT_AM` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `AKTIENDEPOT_ZUWEISUNG`
--

CREATE TABLE `AKTIENDEPOT_ZUWEISUNG` (
  `AKTIENDEPOT_ID` int(11) NOT NULL,
  `AKTIE_ID` int(11) NOT NULL,
  `AKTIE_ANZAHL` int(11) NOT NULL,
  `GEKAUFT_AM` timestamp NOT NULL,
  `VERKAUFT_AM` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `MULTIPLAYER_ACCOUNT`
--

CREATE TABLE `MULTIPLAYER_ACCOUNT` (
  `MULTIPLAYER_ID` int(11) NOT NULL,
  `MULTIPLAYER_KONTOSTAND` int(11) DEFAULT NULL,
  `MULTIPLAYER_SPIEL_ID` int(11) DEFAULT NULL,
  `ERSTELLT_AM` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `MULTIPLAYER_ACCOUNT`
--

INSERT INTO `MULTIPLAYER_ACCOUNT` (`MULTIPLAYER_ID`, `MULTIPLAYER_KONTOSTAND`, `MULTIPLAYER_SPIEL_ID`, `ERSTELLT_AM`) VALUES
(15, NULL, NULL, '2023-03-31 16:29:02');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `MULTIPLAYER_DEPOT`
--

CREATE TABLE `MULTIPLAYER_DEPOT` (
  `MULTIPLAYER_DEPOT_ID` int(11) NOT NULL,
  `MULTIPLAYER_ID` int(11) NOT NULL,
  `ERSTELLT_AM` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `MULTIPLAYER_DEPOT_ZUWEISUNG`
--

CREATE TABLE `MULTIPLAYER_DEPOT_ZUWEISUNG` (
  `MULTIPLAYER_DEPOT_ID` int(11) NOT NULL,
  `AKTIE_ID` int(11) NOT NULL,
  `AKTIE_ANZAHL` int(11) NOT NULL,
  `GEKAUFT_AM` timestamp NOT NULL,
  `VERKAUFT_AM` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `MULTIPLAYER_SPIEL`
--

CREATE TABLE `MULTIPLAYER_SPIEL` (
  `MULTIPLAYER_SPIEL_ID` int(11) NOT NULL,
  `MULTIPLAYER_PASSWORT` varchar(1024) NOT NULL,
  `BUDGET` int(11) NOT NULL,
  `ANFANGSZEITPUNKT` timestamp NOT NULL,
  `ENDZEITPUNKT` timestamp NOT NULL,
  `ERSTELLT_AM` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `ACCOUNT`
--
ALTER TABLE `ACCOUNT`
  ADD PRIMARY KEY (`ACCOUNT_ID`),
  ADD UNIQUE KEY `SPIELERNAME` (`SPIELERNAME`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`);

--
-- Indizes für die Tabelle `AKTIE`
--
ALTER TABLE `AKTIE`
  ADD PRIMARY KEY (`AKTIE_ID`),
  ADD UNIQUE KEY `AKTIE_NAME` (`AKTIE_NAME`),
  ADD UNIQUE KEY `API_AKTIE_ID` (`API_AKTIE_ID`);

--
-- Indizes für die Tabelle `AKTIENDEPOT`
--
ALTER TABLE `AKTIENDEPOT`
  ADD PRIMARY KEY (`AKTIENDEPOT_ID`);

--
-- Indizes für die Tabelle `AKTIENDEPOT_ZUWEISUNG`
--
ALTER TABLE `AKTIENDEPOT_ZUWEISUNG`
  ADD PRIMARY KEY (`AKTIENDEPOT_ID`,`AKTIE_ID`,`GEKAUFT_AM`);

--
-- Indizes für die Tabelle `MULTIPLAYER_ACCOUNT`
--
ALTER TABLE `MULTIPLAYER_ACCOUNT`
  ADD PRIMARY KEY (`MULTIPLAYER_ID`);

--
-- Indizes für die Tabelle `MULTIPLAYER_DEPOT`
--
ALTER TABLE `MULTIPLAYER_DEPOT`
  ADD PRIMARY KEY (`MULTIPLAYER_DEPOT_ID`);

--
-- Indizes für die Tabelle `MULTIPLAYER_DEPOT_ZUWEISUNG`
--
ALTER TABLE `MULTIPLAYER_DEPOT_ZUWEISUNG`
  ADD PRIMARY KEY (`MULTIPLAYER_DEPOT_ID`);

--
-- Indizes für die Tabelle `MULTIPLAYER_SPIEL`
--
ALTER TABLE `MULTIPLAYER_SPIEL`
  ADD PRIMARY KEY (`MULTIPLAYER_SPIEL_ID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `ACCOUNT`
--
ALTER TABLE `ACCOUNT`
  MODIFY `ACCOUNT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT für Tabelle `AKTIE`
--
ALTER TABLE `AKTIE`
  MODIFY `AKTIE_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `AKTIENDEPOT`
--
ALTER TABLE `AKTIENDEPOT`
  MODIFY `AKTIENDEPOT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `MULTIPLAYER_DEPOT_ZUWEISUNG`
--
ALTER TABLE `MULTIPLAYER_DEPOT_ZUWEISUNG`
  MODIFY `MULTIPLAYER_DEPOT_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `MULTIPLAYER_SPIEL`
--
ALTER TABLE `MULTIPLAYER_SPIEL`
  MODIFY `MULTIPLAYER_SPIEL_ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
