--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

-- Started on 2020-01-14 11:48:07 CST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- TOC entry 206 (class 1259 OID 50606)
-- Name: movie; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.movie (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    poster character varying NOT NULL,
    stock integer NOT NULL,
    trailer character varying NOT NULL,
    "salePrice" integer NOT NULL,
    likes integer DEFAULT 0 NOT NULL,
    availability boolean NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createDate" timestamp without time zone DEFAULT now() NOT NULL,
    "updateDate" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.movie OWNER TO root;

--
-- TOC entry 207 (class 1259 OID 50616)
-- Name: movie_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.movie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movie_id_seq OWNER TO root;

--
-- TOC entry 2979 (class 0 OID 0)
-- Dependencies: 207
-- Name: movie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.movie_id_seq OWNED BY public.movie.id;


--
-- TOC entry 2843 (class 2604 OID 50670)
-- Name: movie id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.movie ALTER COLUMN id SET DEFAULT nextval('public.movie_id_seq'::regclass);


--
-- TOC entry 2972 (class 0 OID 50606)
-- Dependencies: 206
-- Data for Name: movie; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.movie (id, title, description, poster, stock, trailer, "salePrice", likes, availability, "isActive", "createDate", "updateDate") FROM stdin;
3	frozen 4	hehe xd	linkdelposter.com	2	linkdeltrailer.com	10	0	f	t	2020-01-09 22:32:40.170838	2020-01-09 22:32:40.170838
6	Toy Story	hehe xd	linkdelposter.com	2	linkdeltrailer.com	10	0	f	t	2020-01-09 22:32:40.170838	2020-01-09 22:32:40.170838
7	Toy Story 2	hehe xd	linkdelposter.com	2	linkdeltrailer.com	10	0	f	t	2020-01-09 22:32:40.170838	2020-01-09 22:32:40.170838
1	marselo 1	hehe xd	linkdelposter.com	2	linkdeltrailer.com	10	0	f	t	2020-01-09 22:32:40.170838	2020-01-09 22:32:40.170838
2	frozen 3	hehe xd	linkdelposter.com	0	linkdeltrailer.com	10	0	t	t	2020-01-09 22:32:40.170838	2020-01-10 13:14:52.702088
8	Toy Story 5	hehe xd	linkdelposter.com	0	linkdeltrailer.com	10	0	f	t	2020-01-09 22:32:40.170838	2020-01-13 09:38:11.366045
9	Citizen Kane	loren	Ipsum	10	Some trailer	10	0	t	f	2020-01-13 09:21:28.101128	2020-01-13 09:27:09.534456
\.


--
-- TOC entry 2980 (class 0 OID 0)
-- Dependencies: 207
-- Name: movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.movie_id_seq', 9, true);


--
-- TOC entry 2845 (class 2606 OID 50693)
-- Name: movie PK_cb3bb4d61cf764dc035cbedd422; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY (id);


-- Completed on 2020-01-14 11:48:08 CST

--
-- PostgreSQL database dump complete
--

