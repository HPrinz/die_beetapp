int LEDblau = 3; // Farbe blau an Pin 3
int LEDrot = 5; // Farbe rot an Pin 5
int LEDgruen=6; // Farbe gruen an Pin 6
int p=1000; // p ist eine Pause mit 1000ms also 1 Sekunde
int brightness1a = 150; // Zahlenwert zwischen 0 und 255 – gibt die Leuchtstärke der einzelnen Farbe an
int brightness1b = 150; // Zahlenwert zwischen 0 und 255 – gibt die Leuchtstärke der einzelnen Farbe an
int brightness1c = 150; // Zahlenwert zwischen 0 und 255 – gibt die Leuchtstärke der einzelnen Farbe an
int dunkel = 0; // Zahlenwert 0 bedeutet Spannung 0V – also LED aus.

const int AirValue = 529; //you need to replace this value with Value_1
const int WaterValue = 255; //you need to replace this value with Value_2
int intervals = (AirValue - WaterValue);
int soilMoistureValue=0;
void setup(){
  Serial.begin(9600); // open serial port, set the baud rate to 9600 bps
  pinMode(LEDblau, OUTPUT);
  pinMode(LEDgruen, OUTPUT);
  pinMode(LEDrot, OUTPUT);
}

void loop() {

  analogWrite(LEDblau, dunkel); // blau ausschalten
  analogWrite(LEDrot, dunkel); // rotausschalten
  analogWrite(LEDgruen, dunkel); // gruenausschalten

  int val;
  val = analogRead(0);
  Serial.print(val);
  soilMoistureValue=analogRead(A0);
  if(soilMoistureValue > WaterValue && soilMoistureValue < (WaterValue + intervals))
  {
    Serial.println("Very Wet");
    analogWrite(LEDblau, brightness1a); // blau einschalten
  }
  else if(soilMoistureValue > (WaterValue + intervals) && soilMoistureValue < (AirValue - intervals))
  {
    Serial.println("Wet");
    analogWrite(LEDgruen, brightness1c); // gruen einschalten
  }
  else if(soilMoistureValue < AirValue && soilMoistureValue > (AirValue - intervals))
  {
    Serial.println("Dry");
    analogWrite(LEDrot, brightness1b); // rot einschalten
  }
  delay(p);
}