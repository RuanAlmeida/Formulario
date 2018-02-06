-- MySQL Script generated by MySQL Workbench
-- 01/18/18 15:51:09
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema internet_para_todos
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema internet_para_todos
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `internet_para_todos` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `internet_para_todos` ;

-- -----------------------------------------------------
-- Table `internet_para_todos`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `internet_para_todos`.`usuario` (
  `cod_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `login` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `email` VARCHAR(90) NULL,
  PRIMARY KEY (`cod_usuario`),
  UNIQUE INDEX `login_UNIQUE` (`login` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `internet_para_todos`.`entidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `internet_para_todos`.`entidade` (
  `cod_entidade` INT NOT NULL AUTO_INCREMENT,
  `cod_usuario` INT NOT NULL,
  `municipio` VARCHAR(45) NOT NULL,
  `uf` CHAR(2) NOT NULL,
  `cnpj` VARCHAR(18) NOT NULL,
  `nome_prefeito` VARCHAR(45) NOT NULL,
  `nacionalidade_prefeito` VARCHAR(45) NULL,
  `identidade_prefeito` VARCHAR(20) NOT NULL,
  `orgao_expedidor` VARCHAR(10) NULL,
  `cpf_prefeito` VARCHAR(14) NOT NULL,
  `residencia_prefeito` VARCHAR(45) NULL,
  `url` VARCHAR(200) NULL,
  `telefone1` VARCHAR(25) NOT NULL,
  `telefone2` VARCHAR(25) NOT NULL,
  `email_prefeito` VARCHAR(90) NOT NULL,
  PRIMARY KEY (`cod_entidade`),
  INDEX `fk_fomulario_usuario_idx` (`cod_usuario` ASC),
  CONSTRAINT `fk_fomulario_usuario`
    FOREIGN KEY (`cod_usuario`)
    REFERENCES `internet_para_todos`.`usuario` (`cod_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `internet_para_todos`.`localidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `internet_para_todos`.`localidade` (
  `cod_localidade` INT NOT NULL AUTO_INCREMENT,
  `cod_entidade` INT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `latitude` DECIMAL(10,8) NOT NULL DEFAULT 0,
  `longitude` DECIMAL(10,8) NOT NULL DEFAULT 0,
  `populacao` INT NOT NULL,
  PRIMARY KEY (`cod_localidade`),
  INDEX `fk_localidade_entidade1_idx` (`cod_entidade` ASC),
  CONSTRAINT `fk_localidade_entidade1`
    FOREIGN KEY (`cod_entidade`)
    REFERENCES `internet_para_todos`.`entidade` (`cod_entidade`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
