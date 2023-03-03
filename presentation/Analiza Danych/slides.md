---
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080
class: 'text-center'
highlighter: shiki
# show line numbers in code blocks
lineNumbers: true
# persist drawings in exports and build
drawings:
  persist: true
transition: slide-left
# use UnoCSS
css: unocss
---

# Analiza i wizualizacja danych

V Liceum Ogólnokształcące

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Następna strona <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/slidevjs/slidev" target="_blank" alt="GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---
transition: fade-out
---

# Analiza Danych czym się zajmuje?

Analiza danych to dziedzina, która zajmuje się zbieraniem, przetwarzaniem i interpretacją danych w celu uzyskania wiedzy i zrozumienia zjawisk, które te dane opisują.

- 📝 **Zbieranie danych** - w analizie danych ważnym etapem jest zbieranie danych, które mogą pochodzić z różnych źródeł, takich jak ankiety, badania, rejestracje lub dane uzyskiwane z sensorów.
- 🎨 **Wizualizacja danych** - w celu ułatwienia zrozumienia danych stosuje się różne techniki wizualizacji danych, takie jak wykresy, mapy czy grafy.
- 🧑‍💻 **Analiza statystyczna** - po przetworzeniu danych, stosuje się różne techniki statystyczne w celu identyfikacji wzorców i zależności między różnymi zmiennymi.
- 🎥 **Przetwarzanie danych** - po zebraniu danych, często wymagane jest ich oczyszczenie, usunięcie błędów oraz przetworzenie ich na odpowiedni format, który pozwoli na dalszą analizę.
- 🛠 **Budowa modeli predykcyjnych** - analiza danych pozwala na budowanie modeli predykcyjnych, które pozwalają na przewidywanie przyszłych wyników na podstawie analizy historycznych danych.


<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>


---
transition: slide-up
---

# Narzędzia? Co wykorzystamy dzisiaj?


|                                               |                             |
| --------------------------------------------- | --------------------------- |
| <kbd>PostgreSQL</kbd>                         | Baza Danych                 |
| <kbd>PgAdmin 4</kbd>                          | Podgląd danych              |
| <kbd>TypeScript</kbd> / <kbd>JavaScript</kbd> | Język Programowania         |
| <kbd>Google Sheets/Excel</kbd>                | Szybka interpretacja danych |
| <kbd>NestJS</kbd>                             | Web Framework               |
| <kbd>Docker</kbd>                             | Instalacja narzędzi         |
| <kbd>Github + Codespaces</kbd>                | Środowisko programistyczne  |


---
transition: slide-up
---

# Co budujemy?

Chcemy zanalizowa dane które są dostarczane przez ESA. (Edukacyjna Sieć Antysmogowa)
<img border="rounded" src="/diagram.png">

---
transition: slide-up
---

# Edukacyjna Sieć Antysmogowa API

https://public-esa.ose.gov.pl/api/v1/smog

```json
{
  "smog_data": [
    {
      "school": {
        "name": "SZKOŁA PODSTAWOWA IM. JANA PAWŁA II W RACŁAWICACH ŚLĄSKICH",
        "street": "UL. ZWYCIĘSTWA",
        "post_code": "48-250",
        "city": "RACŁAWICE ŚLĄSKIE",
        "longitude": "17.771528",
        "latitude": "50.311402"
      },
      "data": {
        "humidity_avg": 97.7,
        "pressure_avg": 996.875,
        "temperature_avg": -1.6833333333333333,
        "pm10_avg": 183.64166666666665,
        "pm25_avg": 129.51666666666668
      },
      "timestamp": "2023-03-03 17:43:23"
    },
  ]
}
```


---
transition: slide-up
---

# Tabela w bazie danych

Tabela w PostgreSQL gdzie zrzucamy dane do analizy

```sql
CREATE TABLE public.school_measurments
(
    id integer NOT NULL DEFAULT nextval('school_measurments_id_seq'::regclass),
    school_name character varying COLLATE pg_catalog."default" NOT NULL,
    street character varying COLLATE pg_catalog."default" NOT NULL,
    post_code character varying COLLATE pg_catalog."default" NOT NULL,
    city character varying COLLATE pg_catalog."default" NOT NULL,
    longitude double precision NOT NULL,
    latitude double precision NOT NULL,
    humidity double precision NOT NULL,
    pressure double precision NOT NULL,
    temperature double precision NOT NULL,
    pm10 double precision NOT NULL,
    pm25 double precision NOT NULL,
    date_time_with_timezone timestamp with time zone NOT NULL,
    "createdDate" timestamp without time zone NOT NULL DEFAULT now(),
)

```
---

```ts

@Entity()
export class SchoolMeasurments {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    school_name: string;

    @Column()
    street: string;

    @Column()
    post_code: string;

    @Column()
    city: string;

    @Column('float')
    longitude: number;

    @Column('float')
    latitude: number;

    @Column('float')
    humidity: number;

    @Column('float')
    pressure: number;

    @Column('float')
    temperature: number;

    @Column('float')
    pm10: number;
```

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

# SQL Podstawy

Jak zdobyc wszystkie wiersze z tabeli?

```sql
SELECT 
  *
FROM school_measurments
```

Co jeśli chcemy tylko pierwsze 100 wierszy?
```sql
SELECT 
  *
FROM school_measurments
LIMIT 100
```

Chcemy tylko zobaczyc jakie szkoly sa w bazie (bez duplikatów)
```sql
SELECT 
  DISTINCT school_name
FROM school_measurments
```

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

# SQL Podstawy

Funkcje dostępne w SQLu

Ile wierszy jest w tabeli. COUNT
```sql
SELECT 
  count(1)
FROM school_measurments
```

Średnia z całej kolumny AVG
```sql
SELECT 
  AVG(temperature)
FROM school_measurments
LIMIT 100
```

Wyswietl szkoly z Bielska-Białej 
```sql
SELECT 
  DISTINCT school_name
FROM school_measurments
WHERE city="BIELSKO-BIAŁA"
```

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

# SQL Podstawy

Funkcje dostępne w SQLu

Ile wierszy jest w tabeli. COUNT
```sql
SELECT 
  count(1)
FROM school_measurments
```

Średnia temperatury w całej Polsce z wszystkich odczytów.
```sql
SELECT 
  AVG(temperature)
FROM school_measurments
LIMIT 100
```

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

# SQL Podstawy

Funkcje dostępne w SQLu

Wyswietl najnizszą temperaturę pomiędzy 1:00 i 2:00 w nocy dzisiaj
```sql
SELECT 
  MIN(temperature)
FROM school_measurments
WHERE 
  date_time_with_timezone 
  BETWEEN '2023-03-03 00:00:00' and '2023-03-03 01:00:00'
```


Wyswietl najnizszą temperaturę pomiędzy 1:00 i 2:00 w nocy kiedy ciśnienie w danym miejscu było powyzej 1000hpa
```sql
SELECT 
  MIN(temperature)
FROM school_measurments
WHERE 
  date_time_with_timezone 
  BETWEEN '2023-03-03 00:00:00' and '2023-03-03 01:00:00'
  AND pressure > 1000
```

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

# SQL zadania

1. Wyświetl 3 miasta które zanotowały najnizszą temperaturę pomiędzy 2 i 3 wnocy
2. Wyświetl szkoły z Bielska-Białej których kod pocztowy nie jest 43-300
3. Wyświetl miasta gdzie jest więcej niz 3 szkoły 
4. Wyświetl miasta i godzinę gdzie pm2.5 mógł stanowic zagrozenie dla zdrowia i zycia
5. Wyświetl miasta gdzie jest tylko jedna szkoła i godzinę gdzie pm2.5 mógł stanowic zagrozenie dla zdrowia i zycia

---

# Zadania programistyczne web

1. Narysuj mapę (uzyj biblioteki [leaflet](https://leafletjs.com/)) pokazującą wszystkie punkty pomiaru i ich ostatnią wartoś PM10
2. Narysuj wykres zmiany PM2.5 w czasie dla kazdej szkoly (uzyj biblioteki [chart.js](https://www.chartjs.org/docs/latest/samples/line/line.html))

---

---
layout: center
class: text-center
---

# Dziękuję!

## Pytania? 