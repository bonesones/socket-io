# socket-io
erDiagram
    КЛИЕНТ ||--o{ СЧЕТ : имеет
    КЛИЕНТ ||--o{ КАРТА : имеет
    КЛИЕНТ ||--o{ ВКЛАД : имеет
    КЛИЕНТ ||--o{ КРЕДИТ : имеет
    КЛИЕНТ {
        Имя string
        Телефон string
        Почта string
        Биометрия string
    }
    СЧЕТ {
        Номер string
        Баланс number
        Валюта string
    }
    КАРТА {
        Номер string
        Срок действия date
        CVV number
        Тип string
    }
    ВКЛАД {
        Номер string
        Сумма number
        Процент number
        Срок date
    }
    КРЕДИТ {
        Номер string
        Сумма number
        Процент number
        Срок date
        Статус string
    }
