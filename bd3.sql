--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.2

-- Started on 2025-04-08 17:39:48

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 24581)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    parent_id integer
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24580)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 4819 (class 0 OID 0)
-- Dependencies: 217
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 222 (class 1259 OID 24604)
-- Name: consultations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.consultations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(20),
    message text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.consultations OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24603)
-- Name: consultations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.consultations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.consultations_id_seq OWNER TO postgres;

--
-- TOC entry 4820 (class 0 OID 0)
-- Dependencies: 221
-- Name: consultations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.consultations_id_seq OWNED BY public.consultations.id;


--
-- TOC entry 220 (class 1259 OID 24590)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    category_id integer,
    image_url character varying(255)
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24589)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 4821 (class 0 OID 0)
-- Dependencies: 219
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 4651 (class 2604 OID 24584)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 4653 (class 2604 OID 24607)
-- Name: consultations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consultations ALTER COLUMN id SET DEFAULT nextval('public.consultations_id_seq'::regclass);


--
-- TOC entry 4652 (class 2604 OID 24593)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4809 (class 0 OID 24581)
-- Dependencies: 218
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, description, parent_id) FROM stdin;
25	Запчасти для СГУ Derrick (аналоги)	Запчасти и детали для СГУ Derrick (аналоги)	\N
\.


--
-- TOC entry 4813 (class 0 OID 24604)
-- Dependencies: 222
-- Data for Name: consultations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.consultations (id, name, email, phone, message, created_at) FROM stdin;
1	Иван Иванов	ivan@example.com	1234567890	Хочу получить консультацию по товару	2025-03-15 18:42:11.686317
2	Egor	egorik1212bush@gmail.com	89501563931	,kf ,kf ,kf ,kf	2025-04-02 01:36:15.342526
3	Егор	egor12@gmail.com	+7(950)-156-3931	Бла бла бла	2025-04-02 18:26:30.068543
4	Егор	egoregor12@gmail.com	+7(950)-156-3931	Bla bla bla	2025-04-02 18:34:09.6702
5	Nastya	123bn@gmail.com	+7(950)-156-3931	2343trgfhgbv	2025-04-02 18:37:10.782618
6	Егор	e@gmail.com	89501563931	pdskjlsvnjc	2025-04-02 18:49:33.548158
7	Егор Бушков	egorik1212bush@gmail.com	+7(950)-156-3931	Помогите	2025-04-02 18:50:38.941495
8	Егор Бушков	egorik1212bush@gmil.com	+7(950)-156-3931	Помогите	2025-04-02 18:53:23.937379
9	Бушков Егор Владимирович	egorik1212bush@gmail.com	+7(950)-156-3931	Нужна консультация по поводу вашего аналогового продукта Derrick	2025-04-02 18:59:45.775894
10	Бушков Егор Владимирович	egorik1212bush@gmail.com	+7(950)-156-3931	Нужна консультация по поводу вашего аналогового продукта Derrick	2025-04-02 19:04:03.802287
11	Бушков	egorik1212bush@gmail.com	+7(950)-156-3931	Хочу купить вашу продукцию аналоговую!	2025-04-04 15:38:00.429628
\.


--
-- TOC entry 4811 (class 0 OID 24590)
-- Dependencies: 220
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, description, category_id, image_url) FROM stdin;
25	Запасные части к илоотделителям Derrick Corp.	Описание детали	25	/uploads/1744115628682.png
26	Запасные части к пескоотделителям Derrick corp.	Описание детали	25	/uploads/1744115744412.png
27	Запасные части к виброситам Derrick corp.	Описание детали	25	/uploads/1744116320271.png
\.


--
-- TOC entry 4822 (class 0 OID 0)
-- Dependencies: 217
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 25, true);


--
-- TOC entry 4823 (class 0 OID 0)
-- Dependencies: 221
-- Name: consultations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.consultations_id_seq', 11, true);


--
-- TOC entry 4824 (class 0 OID 0)
-- Dependencies: 219
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 27, true);


--
-- TOC entry 4656 (class 2606 OID 24588)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4660 (class 2606 OID 24612)
-- Name: consultations consultations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consultations
    ADD CONSTRAINT consultations_pkey PRIMARY KEY (id);


--
-- TOC entry 4658 (class 2606 OID 24597)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4661 (class 2606 OID 24613)
-- Name: categories categories_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- TOC entry 4662 (class 2606 OID 24598)
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


-- Completed on 2025-04-08 17:39:49

--
-- PostgreSQL database dump complete
--

