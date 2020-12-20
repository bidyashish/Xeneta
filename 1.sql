SELECT to_char(day, 'YYYY-MM-DD') AS day,
    ROUND(AVG(price))::bigint AS average_price
FROM prices
WHERE day BETWEEN '2016-01-01' s AND '2016-01-10'
    AND (
        orig_code = 'CNSGH'
        OR orig_code IN (
            SELECT code
            FROM ports
            WHERE parent_slug = 'CNSGH'
        )
        OR orig_code IN (
            SELECT code
            FROM ports
            WHERE parent_slug IN (
                    SELECT slug
                    FROM regions
                    WHERE parent_slug = 'CNSGH'
                )
        )
    )
    AND (
        dest_code = 'north_europe_main'
        OR dest_code IN (
            SELECT code
            FROM ports
            WHERE parent_slug = 'north_europe_main'
        )
        OR dest_code IN (
            SELECT code
            FROM ports
            WHERE parent_slug IN (
                    SELECT slug
                    FROM regions
                    WHERE parent_slug = 'north_europe_main'
                )
        )
    )
GROUP BY day
ORDER BY day ASC
//
//

SELECT to_char(day, 'YYYY-MM-DD') AS day,
    (
        CASE
            WHEN COUNT(*) > 3 THEN ROUND(AVG(price))::bigint
        END
    ) AS average_price
FROM prices
WHERE day BETWEEN %(date_from) s AND %(date_to) s
    AND (
        orig_code = %(origin) s
        OR orig_code IN (
            SELECT code
            FROM ports
            WHERE parent_slug = %(origin) s
        )
        OR orig_code IN (
            SELECT code
            FROM ports
            WHERE parent_slug IN (
                    SELECT slug
                    FROM regions
                    WHERE parent_slug = %(origin) s
                )
        )
    )
    AND (
        dest_code = %(destination) s
        OR dest_code IN (
            SELECT code
            FROM ports
            WHERE parent_slug = %(destination) s
        )
        OR dest_code IN (
            SELECT code
            FROM ports
            WHERE parent_slug IN (
                    SELECT slug
                    FROM regions
                    WHERE parent_slug = %(destination) s
                )
        )
    )
GROUP BY day
ORDER BY day ASC



//

SELECT  (avg(B.price)), B.Day FROM public.ports A
INNER JOIN public.prices B ON A.code = B.orig_code
LEFT OUTER JOIN public.regions C on A.parent_slug=c.parent_slug
WHERE (A.code = 'CNSGH' OR C.slug = 'north_europe_main') AND B.Day BETWEEN '2016-01-01' AND '2016-01-10' 
group by B.Day
order by B.Day

