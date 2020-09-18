let humi = 0
let temp = 0
KSRobot_IOT.Wifi_setup(
SerialPin.P15,
SerialPin.P8,
"ASUS_chickenhouse",
"0937675615",
KSRobot_IOT.IOT_Config.STATION
)
KSRobot_IOT.MQTT_set(
"broker.hivemq.com",
1883,
"yys2023",
"",
""
)
I2C_LCD1602.LcdInit(32)
I2C_LCD1602.ShowString("Temp:", 0, 0)
I2C_LCD1602.ShowString("Humi:", 0, 1)
basic.pause(2000)
KSRobot_IOT.MQTTSubscribe1(KSRobot_IOT.TOPIC.Topic0, "yys/temp")
KSRobot_IOT.MQTTSubscribe1(KSRobot_IOT.TOPIC.Topic1, "yys/humi")
basic.forever(function () {
    if (KSRobot_IOT.Wifi_Connection()) {
        KSRobot_IOT.MQTTPublish1(KSRobot_IOT.TOPIC.Topic0, convertToText(temp))
        KSRobot_IOT.MQTTPublish1(KSRobot_IOT.TOPIC.Topic1, convertToText(humi))
        basic.pause(1000)
    }
})
basic.forever(function () {
    dht11_dht22.queryData(
    DHTtype.DHT11,
    DigitalPin.P0,
    true,
    false,
    true
    )
    temp = Math.round(dht11_dht22.readData(dataType.temperature))
    humi = Math.round(dht11_dht22.readData(dataType.humidity))
    I2C_LCD1602.ShowNumber(temp, 6, 0)
    I2C_LCD1602.ShowNumber(humi, 6, 1)
})
