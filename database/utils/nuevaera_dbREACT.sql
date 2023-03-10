CREATE DATABASE  IF NOT EXISTS `nuevaera_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `nuevaera_db`;
-- MariaDB dump 10.19  Distrib 10.4.22-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: nuevaera_db
-- ------------------------------------------------------
-- Server version	10.4.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brands` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'AKG'),(2,'AMADEUS'),(3,'ASHTON'),(4,'BOSS'),(5,'BRESSANT'),(6,'CARLO GIORDANO'),(7,'CASIO'),(8,'EPIPHONE'),(9,'FENDER'),(10,'FIDELO'),(11,'FLANGER'),(12,'GYL'),(13,'HOFNER'),(14,'HOHNER'),(15,'J MICHAEL'),(16,'HUBERT'),(17,'KURZWEIL'),(18,'JUPITER'),(19,'LEEM'),(20,'MARSHALL'),(21,'MEMPHIS'),(22,'ON STAGE'),(23,'OQAN'),(24,'ORANGE'),(25,'QUIK LOK'),(26,'ROCKSTAND'),(27,'SQUIER'),(28,'SX'),(29,'TAMA'),(30,'UBER'),(31,'VONYX'),(32,'VOX'),(33,'YAMAHA'),(34,'ROLAND'),(35,'GIBSON'),(36,'ALHAMBRA');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'guitar','guitar.jpg','Guitarras'),(2,'drums','drums.jpg','Baterias'),(3,'bass','bass.jpg','Bajos'),(4,'keyboard','keyboard.jpg','Teclados'),(5,'flute','flute.jpg','Flautas'),(6,'melodic','melodic.jpg','Mel??dicas'),(7,'clarinet','clarinet.jpg','Clarinetes'),(8,'saxophone','saxophone.jpg','Saxofones'),(9,'harmonica','harmonica.jpg','Arm??nicas'),(10,'trombone','trombone.jpg','Trombones'),(11,'trumpet','trumpet.jpg','Trompetas'),(12,'oboe','oboe.jpg','Oboes'),(13,'french horn','frenchHorn.jpg','Cornos'),(14,'violin','violin.jpg','Violines'),(15,'viola','viola.jpg','Violas'),(16,'violoncello','violoncello.jpg','Violoncellos'),(17,'double bass','doubleBass.jpg','Contrabajos'),(18,'accesory','accesory.jpg','Accesorios'),(19,'audio production','audioProduction.jpg','Producci??n'),(20,'microphone','microphone.jpg','Micr??fonos'),(21,'amplifier','amplifier.jpg','Amplificadores');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `colors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'BLACK'),(2,'WHITE'),(3,'TURQOISE'),(4,'BROWN'),(5,'EBONY'),(6,'RED'),(7,'COFFEE'),(8,'SILVER'),(9,'TEAL'),(10,'GOLDEN'),(11,'GREY'),(12,'ORANGE'),(13,'BLUE'),(14,'LIGHT BROWN');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_details` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(10) unsigned NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_details_product_id_foreign` (`product_id`),
  KEY `order_details_order_id_foreign` (`order_id`),
  CONSTRAINT `order_details_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_details_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (19,20,21,2),(20,20,33,1),(21,20,11,1),(22,20,9,2),(29,24,5,3),(30,24,16,2),(31,25,4,2),(32,25,15,8),(33,26,12,2),(34,26,9,4),(35,26,41,9),(36,26,16,2),(37,26,5,1),(38,27,5,1),(39,27,4,1);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `amount` int(10) unsigned NOT NULL DEFAULT 0,
  `shippingAddress` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `paymentMethod` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `order_status` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Pending',
  `user_id` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (20,'2022-11-18 01:17:31','2022-11-18 01:17:31',4953175,'Balbanera 150, Buenos Aires','Tarjeta de Debito','Pending',1),(24,'2022-12-05 15:27:14','2022-12-05 15:27:14',7131454,'Borombom bon 4545, Buenos Aires, Argentina','Efectivo','Pending',1),(25,'2022-12-06 21:56:08','2022-12-06 21:56:08',158446466,'Bonorino 2411, Resistencia, Chaco','Tarjeta de Credito','Pending',17),(26,'2022-12-06 21:59:14','2022-12-06 21:59:14',15928767,'Piedras 1425, San Salvador de Jujuy, Jujuy','Efectivo','Pending',18),(27,'2022-12-07 01:42:04','2022-12-07 01:42:04',4306883,'lalala 23, Buenos Aires','Efectivo','Pending',1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `brand_id` int(10) unsigned NOT NULL DEFAULT 0,
  `price` int(10) unsigned NOT NULL DEFAULT 0,
  `category_id` int(10) unsigned NOT NULL DEFAULT 0,
  `shortDesc` text COLLATE utf8_unicode_ci NOT NULL,
  `longDesc` text COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'default.png',
  `dispatch` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `discount` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `stock` int(10) unsigned NOT NULL DEFAULT 0,
  `color_id` int(10) unsigned NOT NULL DEFAULT 0,
  `detail` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `brand_id` (`brand_id`),
  KEY `color_id` (`color_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Deluxe Asat FULLERTON',12,1045332,1,'G&L Fullerton Deluxe Asat Special MP Guitarra El??ctrica Turqoise','El legado del legendario Leo Fender, G&L Guitars contin??a produciendo instrumentos excepcionales en el siglo XXI, adhiri??ndose estrechamente a la visi??n de su ic??nico fundador. Una piedra angular de su l??nea de guitarras el??ctricas, la guitarra el??ctrica Fullerton Deluxe ASAT Special es una guitarra estilo T fabricada en EE. UU. que abarca por completo el estilo vintage y la funcionalidad moderna en igual medida. La guitarra el??ctrica G&L ASAT Special presenta un cuerpo de Swamp Ash, con su hermosa veta brillando en todo su esplendor. Sin embargo, esta elecci??n de material no es solo por su valor est??tico, ya que Swamp Ash ofrece un sonido equilibrado con bajos c??lidos, agudos n??tidos y mucha resonancia natural. Su peso ligero es otra ventaja, haciendo de esta guitarra una opci??n perfecta para presentaciones en vivo.','01-FullertonTurqoise.jpg',0,16,200,3,'/api/products/1'),(2,'GUITARRA EL??CTRICA TRIBUTE LEGACY',12,397562,1,'GUITARRA EL??CTRICA TRIBUTE LEGACY MP OLYMPIC WHITE G&L','G&L sorprende con el lanzamiento de la Deluxe Legacy Limited Edition, en acabado Olympic White. La nueva Deluxe Legacy??? es uno de los modelos favoritos de los fans de G&L. Esta guitarra combina la finura de los modelos S-500 y Comanche, dise??ados por Fender con las cl??sicas pastillas Alnico V. Si tu deseo es obtener un tono n??tido y con definici??n, los modelos Legacy son tu opci??n segura para conseguirlo. Las G&L Legacy son las ??ltimas guitarras creadas por Leo para ofrecerte todo lo que buscas en un instrumento. Una vez que toques una guitarra de esta la nueva serie G&L, nunca cambiaras de guitarra!','02-TributeLegacy.jpg',1,14,200,2,'/api/products/2'),(3,'GUITARRA EL??CTRICA CLASSIC BLUESBOY',12,1658762,1,'GUITARRA EL??CTRICA ASAT CLASIC BLUESBOY 90 SUNBURST SEMI HOLLOW R G&L','Versi??n semi-hollow del modelo Bluesboy. Al igual que sus compa??eras de cuerpo s??lido, esta guitarra ofrece un emparejamiento equilibrado de una pastilla P90 G&L dise??ada por Paul Gagon y un pickup de puente G&L Magnetic Field Design de una sola bobina dise??ado por Leo Fender. Enmarcada en un puente cl??sico de acero en caja, la pastilla de puente MFD de una sola bobina ofrece un ataque n??tido con arm??nicos complejos, mientras que las monturas de lat??n individuales ofrecen niveles modernos de refinamiento en el sonido y la afinaci??n. En la posici??n de puente descubrir??s toda la calidez que podr??as pedir. Uniendo las dos pastillas encontrar??s los l??mites de la versatilidad de esta guitarra. El cuerpo semi-hueco suaviza el ataque de rango de medios, acentuando los arm??nicos graves y agudos. La serie de guitarras el??ctricas Tribute ASAT Classic Bluesboy Semi-Hollow sorprende por su precio asequible para todos los m??sicos. Una vez que llegue a tus manos una guitarra Tribute de G&L nunca mirar??s hacia atr??s.','03-ClassicBluesboy.jpg',1,8,200,4,'/api/products/3'),(4,'BAJO EL??CTRICO TOBY STANDARD IV',8,2049321,3,'BAJO EL??CTRICO TOBY STANDARD IV ALPINE WHITE EPIPHONE','Epiphone se enorgullece en presentar el bajo cl??sico que los bajistas han estado pidiendo, el Toby Standard IV. Con sus ra??ces en los dise??os originales de Michael Tobias introducidos hace m??s de 10 a??os, el \'Toby\' trajo la innovaci??n real para los bajistas hambrientos por algo que refleja los estilos de tocar y las t??cnicas mas modernas. Y ahora, Epiphone y el equipo Tobias traen de vuelta a este dise??o cl??sico, una vez m??s,para poner sonidos de corte de borde y dise??os en las manos de todos los m??sicos. El Toby Standard IV, al igual que todos los instrumentos Epiphone, viene con la tranquilidad de saber que se obtiene de nuestra garant??a limitada de por vida respaldado por el famoso servicio de atenci??n al cliente 24/7/365 d??a Gibson Musical Instruments. Echa un vistazo a la audaz e innovadora Toby Standard IV hoy!','04-StandardIV.jpg',1,7,200,2,'/api/products/4'),(5,'BAJO EL??CTRICO DELUXE IV EBONY',8,2257562,3,'BAJO EL??CTRICO TOBY DELUXE IV EBONY EPIPHONE','Epiphone se enorgullece de reintroducir el bajo cl??sico que los bajistas han estado esperando, el Toby Deluxe IV. Con sus ra??ces en los dise??os originales de Michael Tobias se introdujo hace m??s de 10 a??os, el \'Toby\' trajo la innovaci??n real para los bajistas modernos. Y ahora, Epiphone y el equipo Tobias traen de vuelta este dise??o cl??sico, una vez m??s, para poner sonidos de corte mas agresivo en las manos de todos los m??sicos.','05-DeluxeIVEbony.jpg',1,19,200,5,'/api/products/5'),(6,'BAJO EL??CTRICO EB-3 CHERRY',8,2075172,3,'BAJO EL??CTRICO EB-3 BASS SG STYLE CHERRY EPIPHONE','A principios de los a??os sesenta, la f??brica de Kalamazoo, donde se fabrican instrumentos de Epiphone y Gibson, decidi?? cesar la producci??n de la guitarra Les Paul. En su lugar vino un nuevo y radical dise??o de guitarra que tambi??n influy?? en los dise??os de bajo de la f??brica de Kalamazoo. Con la Les Paul (temporalmente) fuera de escena, el SG se hizo cargo. Y por un tiempo durante esa ??poca dorada de fabricaci??n, el cl??sico bajo SG fue el ??nico bajo el??ctrico de la hist??rica f??brica. Pero el bajo EB \'SG\' no fue en absoluto un fracaso. R??pidamente se convirti?? en uno de los bajos m??s atractivos y distintivos del rock y m??sicos como Bill Wyman de The Rolling Stones, Jack Bruce de Cream y John Entwistle de The Who\'s hicieron historia en el rock con bajos al estilo SG. Ahora, Epiphone presenta el EB-3, una impresionante recreaci??n de la maravilla vintage con todo el tono y la sensaci??n del original sin la etiqueta de precio vintage y los problemas vintage. El Epiphone EB-3 viene con la garant??a limitada de por vida de Epiphone y el servicio al cliente Gibson 24/7/365. Visite a su distribuidor autorizado de Epiphone hoy y descubra el sonido de una leyenda con el bajo EB-3. Parte del encanto del bajo EB-3 viene de su m??stil de escala larga que agrega al gran sustain y al timbre del bajo. El cuerpo de caoba en forma de SG tiene un m??stil de caoba a escala de 34 pulgadas que es un ajuste f??cil no s??lo para los bajistas sino tambi??n para los guitarristas que ocasionalmente se encargan del bajo en el estudio o en el escenario. El cuello SlimTaper??? tiene incrustaciones trapezoidales cl??sicas y una tuerca est??ndar de 1.65 pulgadas. El timbre del EB-3 tampoco ha cambiado con el famoso pickup Sidewinder humbucker de Epiphone en la posici??n del m??stil y nuestro famoso mini-humbucker de NYT en la posici??n del puente, que complementa a la perfecci??n el cuerpo de caoba de tono claro. El EB-3 cuenta con un interruptor de selecci??n de pastilla de tres posiciones estilo retro para dar forma a la respuesta de frecuencia. En conjunto, el EB-3 le ofrece una amplia gama de tonos y colores que supera con creces casi todos los bajos disponibles para el m??sico que trabaja y se mantiene f??cilmente en cualquier escenario. Como todos nuestros modelos de Epiphone, el EB-3 utiliza todo el hardware de n??quel, un puente completamente ajustable, un control de respuesta de volumen, tono y frecuencia con potenci??metros de 500K O de tama??o completo, y clavijas premium de estilo cl??sico.','06-EB3Cherry.jpg',1,7,1000,6,'/api/products/6'),(7,'TECLADO SA77',7,2982934,4,'TECLADO DIGITAL SA77 CASIO','Con sus 44 teclas, los modelos SA-76 y SA-77 ofrecen a los exploradores musicales todo lo necesario para tocar sus primeras melod??as. 100 tonos, 50 ritmos y 10 canciones integradas garantizan la diversi??n al mismo tiempo que su sintetizador LSI y su polifon??a de 8 voces se encargan de la calidad del sonido. La pantalla LC le ayuda a elegir y seleccionar las diferentes posibilidades musicales. A esto hay que a??adir su novedoso bot??n de cambio: en el modelo SA-76 les permite variar f??cilmente entre los modos piano y ??rgano, y en el SA-77 entre los de piano y sonido de ??rgano / armonio. Por lo dem??s, ambos miniteclados se distinguen por su colorido dise??o: la carcasa inferior del SA-76 es de color naranja rojizo y la del SA-77 es gris. Tanto si elige colores alegres como si prefiere un tono gris m??s discreto, ambos modelos SA ser??n como un hurac??n de creatividad para la habitaci??n de los m??s peque??os.','07-SA77.jpg',0,1,200,1,'/api/products/7'),(8,'TECLADO CT-S200WE CASIOTONE',7,9038231,4,'TECLADO DIGITAL CT-S200WE CASIOTONE BLANCO CASIO','Nueva gama de teclados Casiotone. Gracias a su dise??o compacto, con una reducci??n de tama??o de aproximadamente un 30% respecto a la gama CTK, y a la alimentaci??n a pilas opcional, los nuevos Casiotone ofrecen una flexibilidad total a la hora de crear m??sica. Con un reducido peso de 3,3 kg, esta gama es muy f??cil de transportar gracias a la pr??ctica asa de transporte integrada en el dise??o.El modo Dance Music permite a los usuarios de Casiotone reproducir partes de percusi??n, bajo y sintetizador para crear m??sica Dance sin ning??n esfuerzo. Las 12 diferentes Dance Music Voices a??aden m??s toques creativos, ofreciendo una experiencia a??n m??s completa. Los Casiotone CT-S200, CT-S300 y LK-S250 pueden adem??s conectarse a la aplicaci??n gratuita Chordana Play a trav??s de un smartphone o tablet, ofreciendo a los usuarios una manera muy f??cil de practicar o interpretar su m??sica favorita.','08-CassioTone.jpg',1,6,1000,2,'/api/products/8'),(9,'TECLADO CTS1 CASIOTONE',7,1729549,4,'TECLADO DIGITAL CTS1 CASIOTONE ROJO CASIO','En 1980, el teclado digital Casiotone CT-201 original permit??a a cualquiera hacer m??sica, independientemente de su nivel de habilidad o presupuesto. Con el teclado digital CT-S1, su sucesor espiritual, hemos elevado nuestro propio list??n. El teclado digital Casiotone CT-S1 es un teclado ultraport??til, elegante y de excelente sonido dise??ado para que cualquiera pueda disfrutar tocando. Su incre??ble calidad de sonido lo convierte en un compa??ero musical ideal tanto para principiantes como para teclistas experimentados, y su dise??o elegante y port??til hace que sea divertido tocar en cualquier momento y en cualquier lugar.','09-CTS1.jpg',1,2,200,6,'/api/products/9'),(10,'GUITARRA FA 125CE DREADNOUGHT',9,460561,1,'GUITARRA AC??STICA FA 125CE DREADNOUGHT NEGRA FENDER','La guitarra FA-125CE de un solo corte combina el tono y el estilo de Fender con la electr??nica de Fishman?? para una guitarra hecha para subir al escenario. La construcci??n laminada de calidad con un moderno cabezal Fender 3+3 y un puente Viking crean un instrumento de gran sonido que es f??cil de tocar. Los principiantes y los m??sicos en desarrollo apreciar??n el m??stil de nato que da a la guitarra un tono vivo y una sensaci??n suave y f??cil de tocar.','10-FenderFA125.jpg',0,3,200,1,'/api/products/10'),(11,'BATER??A FT900BBK 5PCS',21,181626,2,'BATER??A AC??STICA FT900BBK 5PCS NEGRA MEMPHIS','Introd??cete al mundo de la percusi??n con este estupendo kit de bater??a de Memphis, trae todo lo b??sico para que puedas empezar a tocar con un producto de calidad sin gastarte una gran cantidad de dinero. No esperes m??s y ven a Nueva Era por tu primer kit de bater??a. Te esperamos.','11-FT900.jpg',1,5,200,1,'/api/products/11'),(12,'BATER??A AC??STICA CL50RS COFFEE TAMA',29,2167759,2,'BATER??A AC??STICA CL50RS COFFEE TAMA','Durante m??s de cuarenta a??os, la gama Superstar ha sido sin??nimo de dise??o innovador y mano de obra ejemplar. La siguiente entrega de esta serie contin??a esta tradici??n, pero a un precio m??s bajo. Los cuerpos m??s delgados est??n hechos de arce 100% y el sistema Star-Mount se utiliza para suspender los vol??menes. Por supuesto, las placas de identificaci??n en forma de T no pod??an faltar. Cualquiera que aprecie la tradici??n pero con un toque moderno apreciar?? este hermoso instrumento.','12-CL50RS.jpg',1,15,200,7,'/api/products/12'),(13,'FLAUTA TRAVERSA FL306SE',5,14646,5,'FLAUTA TRAVERSA FL306SE EN MI BRESSANT','Las Flautas Traversas est??n dise??adas para estudiantes que inician sus estudios musicales. Dada la fiabilidad que ofrece Bressant hacen que este instrumento sea recomendado por numerosos profesionales a sus alumnos. Fabricado con materiales de alta calidad. No dejes pasar esta oportunidad que te ofrece Nueva Era y aprender a tocar este fant??stico instrumento de viento Bressant.','13-FL306SE.jpg',1,16,200,8,'/api/products/13'),(14,'FLAUTA FL250',15,2184957,5,'FLAUTA TRAVERSA J. MICHAEL FL250','La FL250 es una flauta travesera de iniciacion tanto para adultos como para ni??os. Si usted quiere comprar una flauta economica para empezar sus estudios elementales o los de sus hijos en escuela o banda de musica, J.Michael es la mas recomendada por los profesores. Es una flauta que ofreece un buen precio de oferta dentro de los instrumentos musicales asequible al bolsillo de los padres. Su estuche rigido lo protege de cualquier golpe. Incorpora como caracteristicas principales platos cerrados y desalineados.','14-FL250.jpg',1,6,200,8,'/api/products/14'),(15,'AIRBOARD CARBON',14,19293478,6,'MEL??DICA AIRBOARD CARBON 32 TECLAS ROJA HOHNER','Nuevo acabado Carbon Design Red. La AirBoard Carbon es una mel??dica dise??ada para una nueva generaci??n de m??sicos gracias a su incre??ble look, case acolchado y boquilla redise??ada con sistema BlowFlow. Adem??s, HOHNER cuenta con la AirBoardapp para iPhone y Android, la cual consiste en una versi??n virtual del instrumento para tablets y smartphones. 32 notas, estuche incluido.','15-AIRBOARD.jpg',0,8,200,1,'/api/products/15'),(16,'CL125 BRESSANT',5,179384,7,'CLARINETE CL125 CLARINETE BLANCO BRESSANT','Estos clarinetes est??n dise??ados para estudiantes que inician sus estudios musicales. Dada la fiabilidad que ofrece Bressant en su funcionamiento hacen que este instrumento sea recomendado por numerosos profesionales a sus alumnos. Fabricado con materiales de alta calidad. No dejes pasar esta oportunidad que te ofrece Nueva Era y adquiere un clarinete Bressant a un precio inigualable y fabricada con los mejores materiales del mercado.','16-CL125.jpg',1,8,200,2,'/api/products/16'),(17,'CL10 EBONITE',3,2109481,7,'CLARINETE CL10 SI B EBONITE CON ESTUCHE ASHTON','Estupendo clarinete en Si de Ebonite con estuche, especial para iniciaci??n, aunque con un muy buen sonido. En Nueva Era encontrar??s el instrumento de viento que necesitas.','17-CL10EBONITE.jpg',0,2,200,5,'/api/products/17'),(18,'ALTO AS220S',5,1940773,8,'SAXOF??N ALTO AS220S PLATEADO BRESSANT','Los saxofones de la marca Bressant han sido dise??ados expresamente para estudiantes que est??n cursando estudios musicales de grado profesional para convertirse, pasado un tiempo, en m??sicos profesionales.  Dada la fiabilidad que ofrece Bressant, los saxofones que fabrica la marca hacen que este instrumento sea recomendado por numerosos profesionales a sus alumnos. Una de las caracter??sticas que m??s gustan de los saxofones Bressant es, sin ninguna duda, que la fabricaci??n se realiza ??nicamente con materiales de alta calidad, lo que proporciona fiabilidad y durabilidad en el instrumento. ','18-AS220S.jpg',1,4,200,8,'/api/products/18'),(19,'TENOR TS820Z',5,20574573,8,'SAXOF??N TENOR TS820Z LACADO CAF?? BRESSANT','Los saxofones de la marca Bressant han sido dise??ados expresamente para estudiantes que est??n cursando estudios musicales de grado profesional para convertirse, pasado un tiempo, en m??sicos profesionales.  Dada la fiabilidad que ofrece Bressant, los saxofones que fabrica la marca hacen que este instrumento sea recomendado por numerosos profesionales a sus alumnos. Una de las caracter??sticas que m??s gustan de los saxofones Bressant es, sin ninguna duda, que la fabricaci??n se realiza ??nicamente con materiales de alta calidad, lo que proporciona fiabilidad y durabilidad en el instrumento.','19-TS820Z.jpg',0,1,200,7,'/api/products/19'),(20,'CROM??TICA CX12',14,15418666,9,'ARM??NICA CROM??TICA CX12 7545T/48C HOHNER','Tenor, afinaci??n en C. 48 VOCES CON CAMBIO. Las l??neas elegantes de la CX-12 son ??nicas. Estanqueidad excepcional que garantiza un volumen, din??mica y respuesta incre??bles. La t??cnica y elementos alta gama utilizados para la fabricaci??n de este revolucionario dise??o hace que el resultado sea impresionante, y si pones a tus labios en ella te dar??s cuenta por qu??. Con su elegante aspecto y la elegante simplicidad de su construcci??n, la CX12 Black dio la vuelta a muchas cabezas cuando fue introducida en 1992. Poco despu??s gan?? el Premio de Dise??o de la Industria Alemana, que fue definitivamente el primero para un instrumento de arm??nica en los tiempos modernos. Su sonido potente y distintivo y su respuesta r??pida y sencilla lo hacen ideal para el aficionado ambicioso o el profesional contempor??neo que busca una arm??nica crom??tica moderna y f??cil de mantener en estilos como el rock, el pop y el jazz.','20-HOHNERCX12LC.jpg',1,7,200,1,'/api/products/20'),(21,'MIDNIGHT BLUES C',9,560075,9,'ARM??NICA MIDNIGHT BLUES EN C FENDER','La arm??nica diat??nica de 10 orificios Midnight Blues ofrece un tono brillante y atrevido y una calidad profesional sin concesiones. Con leng??etas remachadas en bronce fosforoso y peines ABS ecol??gicos, la arm??nica Midnight Blues de Fender es una opci??n confiable para los artistas de cualquier escenario. Tambi??n cuenta con una cubierta azul oscuro de edici??n limitada para complementar su forma tradicional, con la confiabilidad duradera de cualquier instrumento Fender genuino.','21-MIDNIGHT.jpg',0,4,1000,9,'/api/products/21'),(22,'TENOR TT811L AMADEUS',2,19372979,10,'TROMB??N TENOR TT811L LACADO TUBO ANCHO SIB AMADEUS','Este tromb??n est?? dise??ado para personas que inician sus estudios musicales. Dada la fiabilidad que ofrece Amadeus hacen que este instrumento sea recomendado por numerosos profesionales a sus alumnos. Fabricado con materiales de alta calidad, no dejes pasar esta oportunidad que te ofrece Nueva Era. Adquiere tu tromb??n Amadeus a un precio incre??ble.','22-TT811L.jpg',0,12,1000,10,'/api/products/22'),(23,'Oqan OTR-450',23,337771,11,'Oqan OTR-450 En Si Bemol Trompeta','TROMPETA Trompeta en Sib. Tuber??a ML. Campana: lat??n dorado. Tudel: lat??n dorado. Lat??n dorado exterior para bombas. Pistones: acero inoxidable. Pilar de refuerzo para bomba principal. Anillo ajustable en tercera bomba. Anillo para pulgar en la primera bomba. 2 llaves de desag??e. Acabado lacado. Accesorios incluidos: boquilla est??ndar 7C, kit de limpieza, aceite para pistones y estuche de ABS con bolsillo y correas','23-OTR450.jpg',0,8,200,10,'/api/products/23'),(24,'OB500N ABS ??BANO',5,1207004,12,'OBOE OB500N ABS ??BANO BRESSANT','Los oboes est??n dise??ados para estudiantes que inician sus estudios musicales. Dada la fiabilidad que ofrece Bressant en su funcionamiento hacen que este instrumento sea recomendado por numerosos profesionales a sus alumnos. Fabricado con materiales de alta calidad. No dejes pasar esta oportunidad que te ofrece Nueva Era y adquiere un oboe Bressant a un precio inigualable y fabricada con los mejores materiales del mercado.','24-OB500N.jpg',1,18,1000,5,'/api/products/24'),(25,'TP210 JUPITER',18,533739,13,'TROMPA TP210 SI BEMOL DORADA JUPITER','Las trompas de Jupiter est??n dise??adas tanto para estudiantes que inician sus estudios musicales, como para estudiantes intermedios. Dada la fiabilidad que ofrece Bressant hacen que este instrumento sea recomendado por numerosos profesionales a sus alumnos. Fabricado con materiales de alta calidad-Gama estudio. No dejes pasar esta oportunidad que te ofrece Jupiter, y p??sate por tu tienda de Nueva Era para tener la trompa Jupiter al mejor precio.','25-TP210.jpg',1,7,200,10,'/api/products/25'),(26,'YSV104 YAMAHA',33,2028802,14,'VIOL??N EL??CTRICO YSV104 MARR??N YAMAHA','Viol??n el??ctrico YSV104 de color marr??n. Emplea el sistema Yamaha SRT Powered que ha sido un ??xito en los modelos de guitarra silenciosa. Aunque el viol??n silencioso de cuerpo s??lido no tiene una c??mara resonante, SRT Powered simula la respuesta natural, la resonancia corporal y el sonido que el jugador experimentar??a con un instrumento ac??stico. Puente, reposa la barbilla, cordal, cuello y otras partes que afectan la postura y la sensaci??n de tocar est??n en las mismas posiciones que en un viol??n ac??stico y marco dise??ado para permitir la fijaci??n de soportes de hombro tipo puente est??ndar. Adem??s de un conector para auriculares y auriculares suministrados para la pr??ctica privada, el viol??n YSV104 tiene un conector AUX IN que se puede conectar directamente a un reproductor de audio externo u otra fuente para la pr??ctica de juego.','26-YSV104.jpg',1,5,1000,1,'/api/products/26'),(27,'SVD2044 HUBERT',16,6584953,14,'VIOL??N SVD2044 4/4 MADERA S??LIDA HUBERT','Los  violines Hubert son perfectos para los estudiantes y aquellos que desean iniciarse en el mundo de los violines sin tener que hacer una inversi??n inicial demasiado grande. Son instrumentos con una gran relaci??n calidad/precio, incluyendo arco, resina y estuche con todo lo necesario para empezar en este mundo. Nota: Nuestros violines se env??an con el puente desmontado para evitar da??os durante el transporte.','27-SVD2044.jpg',1,16,1000,4,'/api/products/27'),(28,'Carlo Giordano VL1 Viola 15 pulgadas',6,379529,15,'Carlo Giordano VL1 Viola 15 pulgadas','Viola de estudio de 15 pulgadas, totalmente maciza con tapa de abeto, contorno y fondo de arce. Completa, con arco y estuche, con cabado envejecido satinado. Nota: Nuestros violines y biolas se env??an con el puente desmontado para evitar da??os durante el transporte.','28-VL1.jpg',1,30,200,4,'/api/products/28'),(29,'VIOLONCELLO SUITE 4/4 FIDELIO',10,8201451,16,'VIOLONCELLO SUITE 4/4 FIDELIO','Violonchelo de estudio medio Fidelio, para in??ciarse en la pr??ctica de un instrumento tan sofisticado como hermoso a la hora de sonar. Tama??o normal para todas las edades (4/4).','29-FIDELIO.jpg',1,14,200,4,'/api/products/29'),(30,'CONTRABAJO ALFRED S60 1/2 HOFNER',13,5805499,17,'CONTRABAJO ALFRED S60 1/2 HOFNER','Si tu pasi??n es el contrabajo y te encanta tocarlo, no lo dudes m??s y p??sate por tu tienda Nueva Era a conocer, en primera persona, los nuevos contrabajos de la marca Hofner. Realizados con los mejores materiales del mercado para encontrar el sonido ??nico de la marca, sus acabados no te van a dejar indiferente y te har??n, con toda seguridad, seguir enamor??ndote de este instrumento. Ven a Nueva Era a conocer la nueva serie de contrabajos de Hofner.','30-ALFRED.jpg',0,9,200,4,'/api/products/30'),(31,'MP840 QUIK LOK',25,13298,18,'CLIP DE MICR??FONO MP840 QUIK LOK','Equipa tu micr??fono con los mejores accesorios de la marca Quik Lok al mejor precio. Soporte de micr??fono deslizable c??nico grande de goma dura para micr??fonos inal??mbricos.','31-MP840.jpg',1,11,200,1,'/api/products/31'),(32,'FUNDA ATRIL SMSB-6500 CON ASA ON STAGE',22,330953,18,'FUNDA ATRIL SMSB-6500 CON ASA ON STAGE','Fabricada en lona negra, con asa y correa hombrera. Puede alojar la mayor??a de modelos de atriles plegables, incluyendo todos los de las series SM7122 y SM7222. ','32-SMSB.jpg',1,13,200,1,'/api/products/32'),(33,'Rockstand RS10010B',26,192301,18,'Rockstand RS10010B Atril De Partituras',' Atril negro ajustable de 50-125cm, completamente plegable, incluye funda.','33-Rockstand.jpg',1,18,200,1,'/api/products/33'),(34,'FFL05BK FLANGER',11,147589,18,'ATRIL DE PARTITURAS NEGRO FFL05BK FLANGER','Atril plegable Flanger, ajustable en altura y posici??n para colocaci??n f??cil y ??ptima. Fabricados en aluminio, resistentes y ligeros, para facilitar su transporte y la duraci??n del atril.','34-FFL0.jpg',0,15,200,1,'/api/products/34'),(35,'YAMAHA AG03',33,81014,19,'YAMAHA AG03 INTERFACE','USB 2.0 Audiointerface y Mixer, 24-bit / 192 kHz, con entrada para Micr??fono, l??nea de entrada XLR/ TR Combo, tres l??neas de entrada de 1/4. Entrada conmutable a Hi-Z, 2 salidas de l??nea de 1/4, 2 salidas de l??nea RCA, auriculares est??reo y salida de 1/4 TRS. Pedal-Input, Auriculares-Conexi??n 2x 1/8 pulgadas, TRS Mini-Jack (auriculares y micr??fono), AUX-Input 1/8 pulgadas TRS est??reo, USB-Conexi??n, + 48V Phantom Power, Pad-Switch, DSP-Efectos en Canal 1: Compresor / EQ y SPX Reverb, 60mm Fader, FX Bypass (interruptor de pedal opcional), el iPad es compatible con la c??mara opcional Kit de conexi??n (no incluido), alimentado por bus USB (5V, 500mA), incl Steinberg Cubase AI. Dimensiones: 129 x 63 x 202 mm. Peso: 0,8 kg','35-AG03.jpg',1,15,200,2,'/api/products/35'),(36,'DM300 LEEM',19,116311,20,'MICR??FONO DIN??MICO DM300 LEEM','Si buscas un micr??fono din??mico con una relaci??n calidad precio excepcional, sin duda debes elegir este micr??fono Leem DM300. Fabricado para ofrecer soluci??n en casi todo momento, este micr??fono din??mico te sorprender?? por su calidad de sonido.','36-DM300.jpg',1,4,200,1,'/api/products/36'),(37,'P3S AKG',1,138081,20,'MICR??FONO DIN??MICO P3S AKG','El micr??fono din??mico P3S es especialmente adecuado para coros, instrumentos de viento y muchas otras aplicaciones en vivo. Inusualmente robusto con carcasa met??lica y cabeza con rejilla, el micr??fono P3S posee un interruptor de encendido/apagado sin crujidos. No pierdas esta oportunidad y hazte con el tuyo.','37-P3S.jpg',0,5,200,1,'/api/products/37'),(38,'CM400 VONYX',31,91609,20,'MICR??FONO DE ESTUDIO DE CONDENSADOR CM400 NEGRO VONYX','Micr??fono de diafragma de condensador de alta calidad que recoge gran abanico de frecuencias. Est?? dise??ado tanto para aplicaci??n vocal como para instrumentos. Este micr??fono est?? acabado en una carcasa elegante de color negro/oro. Su bajo nivel de distorsi??n permite una reproducci??n de sonido fant??stica. Micr??fono perfecto para estudios, directo y postproducci??n.','38-CM400.jpg',0,19,200,10,'/api/products/38'),(39,'KM1UGS KURZWEIL',17,186836,20,'MICR??FONO CONDENSADOR PLATEADO KM1UGS KURZWEIL','Micr??fono USB de Kurzweil cardioide con entrada para auricular, bot??n de MUTE, control de ganancia, control independiente del volumen del auricular y c??psula plateada. Un micr??fono bien completo. No dejes pasar esta oportunidad y ven a Music??polix a por esta maravilla.','39-KM1UGS.jpg',0,3,200,1,'/api/products/39'),(40,'MICR??FONO PROFESIONAL UBER MULTIPATRON USB M-AUDIO',30,23058,20,'MICR??FONO PROFESIONAL UBER MULTIPATRON USB M-AUDIO','Uber Mic es la configuraci??n perfecta para todas sus necesidades de grabaci??n, ya sea grabando instrumentos ac??sticos y voces, capturando un audio cristalino para podcasts y retransmisiones, o simplemente llevando su experiencia  al siguiente nivel. Uber Mic lo hace todo: ??comienza a grabar, transmitir y transmitir ahora!. La grabaci??n cristalina exige las herramientas adecuadas para el trabajo. El Uber Mic de M-Audio presenta un micr??fono de condensador de 3 c??psulas de diafragma grande, perfecto para aplicaciones de podcasting o para capturar audio de alta calidad de vocalistas, instrumentos, percusi??n y guitarras. Con una selecci??n de cuatro patrones polares que incluyen cardioide, omnidireccional, figure-8 y est??reo de punto ??nico, Uber Mic est?? preparado para pr??cticamente cualquier escenario de grabaci??n.','40-MULTIPATRON.jpg',1,10,1000,1,'/api/products/40'),(41,'Pathfinder 10W 1X6,5 pulgadas',32,228747,21,'Vox Pathfinder Amplif Guitarra 10. 10W 1X6,5 pulgadas','Amplificador Vox Pathfinder 10 Con la cl??sica imagen de sus hermanos mayores, el nuevo Pathfinder de 10W representa todo el caracter Vox en un combo con un sonido realmente compacto. Al igual que otros amplificadores de la familia Vox viste la rejilla con formas de diamante, con el embellecedor dorado o los botones \'chicken head\'. Este combo de 10W impulsado a trav??s de un altavoz de 6.5 pulgadas es perfecto para practicar en casa a bajos vol??menes, grabaciones dom??sticas o para llev??rtelo a cualquier lugar por su liviano peso. Cuenta con un switch de selecci??n de canal para elegir sonidos limpios o saturados.Adem??s incorpora entrada de auriculares para que puedas practicar sin molestar a los vecinos ya que al introducir el jack mutear?? el altavoz, y salida de l??nea para que puedas grabar directamente al ordenador sin necesidad de microfon??a. El resto de controles se reparten en un control de Gain, Treble y Bass para controlar la EQ y un pote de Volumen.','41-Pathfinder.jpg',1,9,200,1,'/api/products/41'),(42,'KATANA-MINI BOSS',4,228390,21,'MINI AMPLIFICADOR KATANA-MINI BOSS','El Katana-Mini hace que el tono serio del Katana sea accesible en un peque??o amplificador que funciona con bater??as. Con una calidad de sonido que supera ampliamente a otros amplificadores de su clase, esta miniatura cuenta con un aut??ntico circuito de ganancia anal??gica multietapa para un sonido grande y expresivo, adem??s de un ecualizador anal??gico tradicional. Ultra-compacto y preparado para ir de un sitio a otro, el Katana-Mini ofrece un tono de Katana inspirador donde quiera que est??s.','42-KATANA.jpg',0,4,200,1,'/api/products/42'),(43,'AMPLIFICADOR DE GUITARRA JVM210C MARSHALL',20,166847,21,'AMPLIFICADOR DE GUITARRA JVM210C MARSHALL','Si buscas todo el cl??sico de Marshall con las caracter??sticas ms novedosas y modernas en cuanto a circuiter??a, sonido y construcci??n, sin duda los JVM son tu modelo a seguir. Amplificador combo All Tube de 100W. Dos canales independientes con tres modos reconfigurables que te transportar??n desde el sonido caracter??stico de los Plexi/JTM45 hasta los actuales High Gain pasando por el legendario JCM800. Equipado con la misma tecnolog??a que el JVM410C, dispone de dos Reverbs de estudio, EQ y Control de volumen independiente por canal y 2 Control Master conmutable. Env??o de efectos. Pedal de 4 pulsadores. Altavoz 12??? Vintage 30 & Heritage.','43-JVM210C.jpg',0,16,200,1,'/api/products/43'),(44,'CR60C ORANGE',24,51439,21,'AMPLIFICADOR GUITARRA CR60C ORANGE','El Amplificador Orange Crush Pro CR60C  es un cl??sico combo de dos canales, con una potencia de 60W y un cono de 12 pulgadas. Combina portabilidad, una amplia variedad tonal de alta gama y un dise??o ideal para conciertos en peque??as salas. Con los mismos controladores y bancos que la serie Terror o TH, mezcla una serie de caracter??sticas muy vers??tiles. Es sin duda alguna, todo un orgullo para Orange.','44-CR60C.jpg',0,5,200,12,'/api/products/44'),(45,'VT20X VOX',32,141312,21,'AMPLIFICADOR PARA GUITARRA VT20X VOX','El nuevo Vox VT20X destaca por su nuevo motor de modelado que proporciona una mejora sustancial de sonidos respecto a su antecesor. Mediante el empleo de un nuevo procesado que Vox denomina VET (Virtual Element Technology), el cual est?? basado en el an??lisis de componentes y circuitos de amplificaci??n, los amplificadores VTX son capaces de reproducir con m??s fidelidad y realismo que nunca los amplificadores que emulan. Como es habitual en la serie Valvetronix desde sus inicios tambi??n emplean una v??lvula de previo 12AX7/ECC83. Este dise??o del circuito de previo incorpora circuitos an??logicos para lograr las sutilezas y matices tonales distintivas en los amplificadores de v??lvulas. Adicionalmente a este circuito inteligente, los VTX cuentan con un mueble con dise??o herm??tico para lograr la m??xima resonancia. Y como novedad importante, cuenta con la posibilidad de edici??n del software para personalizar al m??ximo tanto sus amplificadores como los efectos y crear los tuyos propios.','45-VT20X.jpg',0,8,200,1,'/api/products/45'),(46,'MUSTANG BULLET IMPERIAL',27,203312,1,'GUITARRA EL??CTRICA MUSTANG BULLET IMPERIAL BLUE SQUIER','Perfecto para el sonido estridente de la m??sica indie, el Bullet Mustang HH es simplemente divertido de tocar. Accionado por un par de pastillas de humbucker de sonido gigante, tiene un c??modo m??stil en forma de \'C\' con un moderno diapas??n de 12 pulgadas de radio y un moderno puente de cola dura de seis monturas. Una potencia tonal que golpea muy por encima de su peso, el Bullet Mustang HH es el instrumento ideal para potenciar su pr??ximo golpe.','46-Imperial.jpg',0,13,200,13,'/api/products/46'),(47,'BULLET SSS SPARKLE SQUIER',27,178312,1,'GUITARRA EL??CTRICA BULLET SSS SPARKLE RED SQUIER','La Limited-Edition Bullet Strat es una guitarra simple, asequible y pr??ctica dise??ada para principiantes. Una elecci??n perfecta para una primera guitarra sin importar qui??n eres o qu?? estilo de m??sica quieres aprender. Con las caracter??sticas cl??sicas que hicieron de la Stratocaster una de las guitarras favoritas del mundo, la Bullet Strat es una gran introducci??n a la familia Fender. S??lo por tiempo limitado, est?? disponible en un llamativo acabado Red Sparkle.','47-BULLETSSS.jpg',0,4,200,6,'/api/products/47'),(48,'SX ED2 BSB',28,1518512,1,'GUITARRA EL??CTRICA SX ED2 BSB','Guitarra BSB de cuerpo de Tilo S??lido, con cuello Arce Canadiense seleccionado, diapas??n Palo d\'erosa y trastes Nickel 21. Viene con el clavijero cromado, 2 Picjups Single Coil. Con 3 controles: 1 para el volumen y 2 de tono, color modelo BSB. Incluye funda','48-ED2.jpg',0,11,200,14,'/api/products/48'),(49,'Gibson J45 Vintage',35,2118512,1,'Gibson J45 Standard Vintage Sunburst Guitarra Electroac??stica','Guitarra BSB de cuerpo de Tilo S??lido, con cuello Arce Canadiense seleccionado, diapas??n Palo d\'erosa y trastes Nickel 21. Viene con el clavijero cromado, 2 Picjups Single Coil. Con 3 controles: 1 para el volumen y 2 de tono, color modelo BSB. Incluye funda','49-GIBSON01.jpg',0,11,200,4,'/api/products/49'),(50,'Alhambra CS1CWE5',36,6018512,1,'Guitarra Electrocl??sica Alhambra CS1CWE5','Guitarra BSB de cuerpo de Tilo S??lido, con cuello Arce Canadiense seleccionado, diapas??n Palo d\'erosa y trastes Nickel 21. Viene con el clavijero cromado, 2 Picjups Single Coil. Con 3 controles: 1 para el volumen y 2 de tono, color modelo BSB. Incluye funda','50-ALHAMBRA01.jpg',0,11,200,14,'/api/products/50'),(51,'Roland RP102BK',34,10518512,4,'Roland RP102BK Piano Digital','Al elegir un piano, es muy importante encontrar un instrumento que encaje con tu estilo de vida, presupuesto y espacio. El Roland RP102 cumple en todos los aspectos, con una interpretaci??n de piano aut??ntica y funciones para practicar en un dise??o asequible y compacto. Est?? repleto de tecnolog??as procedentes de nuestros premiados pianos de gama alta ???incluido un lujoso teclado contrapesado que es una delicia de tocar???, y su tacto y sonido te inspirar??n y te acompa??ar??n a medida que progresas como m??sico. Por otra parte, con su mueble estilizado y tres pedales integrados, el RP102 ofrece una apariencia vertical que encaja a la perfecci??n en cualquier lugar con espacio limitado. Gracias a sus funciones avanzadas, el RP102 se integra a la perfecci??n en tu estilo de vida moderno. No hace falta afinarlo ni realizar ning??n mantenimiento especial, y puedes conectarlo con un smartphone o tableta mediante tecnolog??a Bluetooth?? integrada para disfrutar al instante y mejorar el aprendizaje. Enlaza el piano inal??mbricamente con la app gratuita Piano Partner 2 de Roland y accede a partituras digitales, ritmos de acompa??amiento y varias funciones que no est??n disponibles desde el panel. El RP102 es un piano con una relaci??n calidad-precio excepcional, listo para ofrecerte muchos a??os de disfrute musical.','51-ROLAND01.jpg',0,11,200,1,'/api/products/51');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES (1,'admin'),(2,'not-admin');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `province` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `street` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'undefined',
  `type_id` int(10) unsigned NOT NULL DEFAULT 2,
  `avatar` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `detail` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cart` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '[]',
  PRIMARY KEY (`id`),
  KEY `users_ype_id_foreign` (`type_id`),
  CONSTRAINT `users_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Federico','Craviotto','fc@gmail.com','$2a$10$gVRr.7ohtpJdgMskTfcAvO79eMxALcZpoTbEWSM/NFgqwZTSL9V.m','Buenos Aires','calle loca 123','1155669966',1,'1670479072184_img.png','/api/users/1','[{\"id\":\"10\",\"q\":1},{\"id\":\"16\",\"q\":2}]'),(6,'leonardo','turzi','leogturzi@gmail.com','$2a$10$tgkKm9VsH2rCNJzuwH9TauvEUOQa60y4FZMNG11ggOJcT7zNZkkNO','Buenos Aires','rioja 956','11114198376',1,'1667479090773_img.jpeg','/api/users/6','[{\"id\":\"10\",\"q\":1},{\"id\":\"16\",\"q\":2}]');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-08 15:51:56
