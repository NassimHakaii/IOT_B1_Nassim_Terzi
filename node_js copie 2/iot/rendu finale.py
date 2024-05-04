import network   # import des fonctionnalités liées au WiFi
import urequests    # import des fonctionnalités liées aux requêtes HTTP
import utime    # import des fonctionnalités liées au temps
import ujson    # import des fonctionnalités liées à la conversion en JSON
from machine import Pin, PWM
import random

wlan = network.WLAN(network.STA_IF)
wlan.active(True)

print("ok")
# Informations de connexion WiFi
ssid = 'iPhone de Cheikh'
password = 'Cheikh75'
wlan.connect(ssid, password)
print("oké")
# Dictionnaire des maisons de Poudlard avec les valeurs de LED correspondantes [Rouge, Vert, Bleu]
maisons_poudlard = { 
    "Gryffindor": [30000, 5, 5],
    "Slytherin": [5, 30000, 5],
    "Ravenclaw": [5, 5, 30000],
    "Hufflepuff": [30000, 30000, 5]
}

pwm_ledR = PWM(Pin(17, mode=Pin.OUT))
pwm_ledR.freq(1_000)
pwm_ledG = PWM(Pin(18, mode=Pin.OUT))
pwm_ledG.freq(1_000)
pwm_ledB = PWM(Pin(19, mode=Pin.OUT))
pwm_ledB.freq(1_000)
print("okr")
# Attente de la connexion au réseau WiFi
while not wlan.isconnected():
    print("Pas connecté au réseau WiFi...")
    utime.sleep(1)


# Boucle principale
while True:
    try:
        print("GET")
       
        # Construction de l'URL de l'API avec le nom du personnage
        url = "http://172.20.10.5:3000"
        print(url)
        # Requête GET pour obtenir les informations sur le personnage
        reponse = urequests.get(url)
        print(reponse)
        print("GET OK")
        # Extraction du nom du personnage et de sa maison à partir de la réponse JSON
        
        maison = reponse.json()["message"]
        
        reponse.close()
        
        
        print("Maison:", maison)
                
        print("set color")
        print(maisons_poudlard[maison])
    
        # Attribution des valeurs de LED correspondantes à la maison
        pwm_ledR.duty_u16(maisons_poudlard[maison][0])
        pwm_ledG.duty_u16(maisons_poudlard[maison][1])
        pwm_ledB.duty_u16(maisons_poudlard[maison][2])
        
        # Attente avant de réinitialiser les LEDs
        utime.sleep(2)
        
        # Réinitialisation des LEDs
        pwm_ledR.duty_u16(0)
        pwm_ledG.duty_u16(0)
        pwm_ledB.duty_u16(0)
     
    
        
    except Exception as erreur:
        print("Erreur:", erreur)

