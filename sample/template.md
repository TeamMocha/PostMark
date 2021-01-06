## Pokemon Test

**Description**: This is a sample collection./n
[Postman Collection JSON](<./assets/Really Good.postman_collection.json>)
## Route(s)
**Description**: This call will get one Pokemon encounter method (Surf).

**Test URL**: [https://pokeapi.co/api/v2/pokemon/ditto](https://pokeapi.co/api/v2/pokemon/ditto)

### Request

#### **Authorization Type**: bearer
>- Key: token
>- Value: (removed)
>- Type: string


#### **Method**: GET

>- Host: https://pokeapi.co  
>- Path: /api/v2/pokemon/ditto  
#### **Query Parameter(s)**



### Response(s)

---
### **Status Code**: 404 (Not Found)
#### GET /v2/encounter-method/685/?lang=en
**Test URL**: [https://pokeapi.co/api/v2/encounter-method/685/?lang=en](https://pokeapi.co/api/v2/encounter-method/685/?lang=en)
#### **Method**: GET
  
>- Host: https://pokeapi.co  
>- Path: /api/v2/encounter-method/685/  
#### **Query Parameter(s)**
##### Parameter (Response language)
>- key: lang  
>- value: en  


>- Key: Content-Type
>- Value: text/plain; charset=utf-8

#### **Body**
```plain
Not Found
```
---
### **Status Code**: 200 (OK)
#### GET /v2/encounter-method/5/?lang=en
**Test URL**: [https://pokeapi.co/api/v2/encounter-method/5/?lang=en](https://pokeapi.co/api/v2/encounter-method/5/?lang=en)
#### **Method**: GET
  
>- Host: https://pokeapi.co  
>- Path: /api/v2/encounter-method/5/  
#### **Query Parameter(s)**
##### Parameter (Response language)
>- key: lang  
>- value: en  


>- Key: Content-Type
>- Value: application/json; charset=utf-8

#### **Body**
```json
{
    "id": 5,
    "name": "surf",
    "names": [
        {
            "language": {
                "name": "de",
                "url": "https://pokeapi.co/api/v2/language/6/"
            },
            "name": "Surfen"
        },
        {
            "language": {
                "name": "en",
                "url": "https://pokeapi.co/api/v2/language/9/"
            },
            "name": "Surfing"
        }
    ],
    "order": 14
}
```
---
### **Status Code**: 400 (Bad Request)
#### GET /v2/encounter-method/(%)/?lang=en
**Test URL**: [https://pokeapi.co/api/v2/encounter-method/(%)/?lang=en](https://pokeapi.co/api/v2/encounter-method/(%)/?lang=en)
#### **Method**: GET
  
>- Host: https://pokeapi.co  
>- Path: /api/v2/encounter-method/(%)/  
#### **Query Parameter(s)**
##### Parameter (Response language)
>- key: lang  
>- value: en  


>- Key: Content-Type
>- Value: text/html

#### **Body**
```html
<html>
    <head>
        <title>400 Bad Request</title>
    </head>
    <body>
        <center>
            <h1>400 Bad Request</h1>
        </center>
        <hr>
        <center>cloudflare</center>
    </body>
</html>
```
