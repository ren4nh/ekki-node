--
-- PostgreSQL database dump
--

-- Dumped from database version 10.6
-- Dumped by pg_dump version 10.6

-- Started on 2018-12-16 14:38:50

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12924)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2852 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 202 (class 1259 OID 33357)
-- Name: CreditCards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CreditCards" (
    id integer NOT NULL,
    "cardNumber" bigint,
    "cardName" character varying(255),
    "securityCode" integer,
    "expiredAt" timestamp with time zone,
    description character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer NOT NULL
);


ALTER TABLE public."CreditCards" OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 33355)
-- Name: CreditCards_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CreditCards_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."CreditCards_id_seq" OWNER TO postgres;

--
-- TOC entry 2853 (class 0 OID 0)
-- Dependencies: 201
-- Name: CreditCards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CreditCards_id_seq" OWNED BY public."CreditCards".id;


--
-- TOC entry 200 (class 1259 OID 33339)
-- Name: Favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Favorites" (
    id integer NOT NULL,
    description character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer NOT NULL,
    "FavoriteId" integer NOT NULL
);


ALTER TABLE public."Favorites" OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 33337)
-- Name: Favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Favorites_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Favorites_id_seq" OWNER TO postgres;

--
-- TOC entry 2854 (class 0 OID 0)
-- Dependencies: 199
-- Name: Favorites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Favorites_id_seq" OWNED BY public."Favorites".id;


--
-- TOC entry 196 (class 1259 OID 33321)
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 33373)
-- Name: Tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tokens" (
    id integer NOT NULL,
    token character varying(255),
    "expiredAt" timestamp with time zone,
    used boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer NOT NULL
);


ALTER TABLE public."Tokens" OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 33371)
-- Name: Tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Tokens_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Tokens_id_seq" OWNER TO postgres;

--
-- TOC entry 2855 (class 0 OID 0)
-- Dependencies: 203
-- Name: Tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Tokens_id_seq" OWNED BY public."Tokens".id;


--
-- TOC entry 206 (class 1259 OID 33386)
-- Name: Transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Transactions" (
    id integer NOT NULL,
    description character varying(255),
    status character varying(255),
    "amountPayedWithCreditCard" numeric,
    amount numeric,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer NOT NULL,
    "DestinationId" integer NOT NULL
);


ALTER TABLE public."Transactions" OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 33384)
-- Name: Transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Transactions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Transactions_id_seq" OWNER TO postgres;

--
-- TOC entry 2856 (class 0 OID 0)
-- Dependencies: 205
-- Name: Transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Transactions_id_seq" OWNED BY public."Transactions".id;


--
-- TOC entry 198 (class 1259 OID 33328)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(255),
    balance double precision,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 33326)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO postgres;

--
-- TOC entry 2857 (class 0 OID 0)
-- Dependencies: 197
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- TOC entry 2703 (class 2604 OID 33360)
-- Name: CreditCards id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CreditCards" ALTER COLUMN id SET DEFAULT nextval('public."CreditCards_id_seq"'::regclass);


--
-- TOC entry 2702 (class 2604 OID 33342)
-- Name: Favorites id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Favorites" ALTER COLUMN id SET DEFAULT nextval('public."Favorites_id_seq"'::regclass);


--
-- TOC entry 2704 (class 2604 OID 33376)
-- Name: Tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tokens" ALTER COLUMN id SET DEFAULT nextval('public."Tokens_id_seq"'::regclass);


--
-- TOC entry 2705 (class 2604 OID 33389)
-- Name: Transactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transactions" ALTER COLUMN id SET DEFAULT nextval('public."Transactions_id_seq"'::regclass);


--
-- TOC entry 2701 (class 2604 OID 33331)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 2713 (class 2606 OID 33365)
-- Name: CreditCards CreditCards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CreditCards"
    ADD CONSTRAINT "CreditCards_pkey" PRIMARY KEY (id);


--
-- TOC entry 2711 (class 2606 OID 33344)
-- Name: Favorites Favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Favorites"
    ADD CONSTRAINT "Favorites_pkey" PRIMARY KEY (id);


--
-- TOC entry 2707 (class 2606 OID 33325)
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- TOC entry 2715 (class 2606 OID 33378)
-- Name: Tokens Tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tokens"
    ADD CONSTRAINT "Tokens_pkey" PRIMARY KEY (id);


--
-- TOC entry 2717 (class 2606 OID 33394)
-- Name: Transactions Transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transactions"
    ADD CONSTRAINT "Transactions_pkey" PRIMARY KEY (id);


--
-- TOC entry 2709 (class 2606 OID 33336)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 2720 (class 2606 OID 33366)
-- Name: CreditCards CreditCards_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CreditCards"
    ADD CONSTRAINT "CreditCards_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public."Users"(id);


--
-- TOC entry 2719 (class 2606 OID 33350)
-- Name: Favorites Favorites_FavoriteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Favorites"
    ADD CONSTRAINT "Favorites_FavoriteId_fkey" FOREIGN KEY ("FavoriteId") REFERENCES public."Users"(id);


--
-- TOC entry 2718 (class 2606 OID 33345)
-- Name: Favorites Favorites_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Favorites"
    ADD CONSTRAINT "Favorites_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public."Users"(id);


--
-- TOC entry 2721 (class 2606 OID 33379)
-- Name: Tokens Tokens_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tokens"
    ADD CONSTRAINT "Tokens_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public."Users"(id);


--
-- TOC entry 2723 (class 2606 OID 33400)
-- Name: Transactions Transactions_DestinationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transactions"
    ADD CONSTRAINT "Transactions_DestinationId_fkey" FOREIGN KEY ("DestinationId") REFERENCES public."Users"(id);


--
-- TOC entry 2722 (class 2606 OID 33395)
-- Name: Transactions Transactions_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transactions"
    ADD CONSTRAINT "Transactions_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public."Users"(id);


-- Completed on 2018-12-16 14:38:51

--
-- PostgreSQL database dump complete
--

