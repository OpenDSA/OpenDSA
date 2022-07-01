car = {
"brand": "Ford",
"model": "Mustang",
"year": 1964
}
x = car.keys()
print(x) #before the change
car["model"] = "Alfa Romeo"
car["year"] = 2020
print(x) #after the change
