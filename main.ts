// 플레이어수정
function 셋팅 () {
    radio.setGroup(2)
    player = "p2"
    jum = 0
    m1 = 0
    m2 = 0
    m3 = 0
    m4 = 0
    m5 = 0
    m6 = 0
    m7 = 0
    m8 = 0
    잡힌몬 = 0
}
input.onButtonPressed(Button.A, function () {
    radio.sendValue("" + player + "auto", 0)
    오토상태 = 0
    music.startMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
    basic.showLeds(`
        . # # # .
        # . . . .
        . # # # .
        . . . . #
        . # # # .
        `)
})
function catched () {
    basic.showString("F")
    basic.clearScreen()
}
input.onButtonPressed(Button.AB, function () {
    셋팅()
    basic.showString("Hi")
})
function 득점처리 () {
    radio.setGroup(201)
    radio.sendNumber(잡힌몬)
    radio.sendNumber(수동잡힌몬)
    jum += 1
    radio.setGroup(1)
    radio.sendValue(player, 8)
    잡힌몬 = 0
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.pause(200)
    pins.digitalWritePin(DigitalPin.P12, 0)
    music.playTone(349, music.beat(BeatFraction.Half))
    basic.showLeds(`
        . # # # .
        # . # . #
        # # # # #
        # . # . #
        . # # # .
        `)
    basic.showLeds(`
        . . . . .
        . . # . .
        . # . # .
        . . # . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.clearScreen()
}
input.onButtonPressed(Button.B, function () {
    radio.sendValue("" + player + "auto", 1)
    오토상태 = 1
    basic.showString("A")
})
radio.onReceivedValue(function (name, value) {
    if (name == "" + player + "ajum") {
        music.playTone(262, music.beat(BeatFraction.Whole))
        basic.showLeds(`
            # # # . .
            . . . # .
            # # . . #
            . . # . #
            # . # . #
            `)
        basic.showNumber(value)
        잡힌몬 = value
        if (1 == 잡힌몬 && m1 == 0) {
            득점처리()
            m1 = 1
        } else if (2 == 잡힌몬 && m2 == 0) {
            득점처리()
            m2 = 1
        } else if (3 == 잡힌몬 && m3 == 0) {
            득점처리()
            m3 = 1
        } else if (4 == 잡힌몬 && m4 == 0) {
            득점처리()
            m4 = 1
        } else if (5 == 잡힌몬 && m5 == 0) {
            득점처리()
            m5 = 1
        } else if (6 == 잡힌몬 && m6 == 0) {
            득점처리()
            m6 = 1
        } else if (7 == 잡힌몬 && m7 == 0) {
            득점처리()
            m7 = 1
        } else if (8 == 잡힌몬 && m8 == 0) {
            득점처리()
            m8 = 1
        }
    } else if (name == "" + player + "jum") {
        music.playTone(294, music.beat(BeatFraction.Whole))
        basic.showLeds(`
            # # # . .
            . . . # .
            # # . . #
            . . # . #
            # . # . #
            `)
        basic.showNumber(value)
        수동잡힌몬 = value
    }
})
let 수동잡힌몬 = 0
let 오토상태 = 0
let 잡힌몬 = 0
let m8 = 0
let m7 = 0
let m6 = 0
let m5 = 0
let m4 = 0
let m3 = 0
let m2 = 0
let m1 = 0
let jum = 0
let player = ""
셋팅()
let check = 0
music.playSoundEffect(music.builtinSoundEffect(soundExpression.giggle), SoundExpressionPlayMode.UntilDone)
pins.setPull(DigitalPin.P13, PinPullMode.PullNone)
pins.setPull(DigitalPin.P14, PinPullMode.PullNone)
pins.setPull(DigitalPin.P15, PinPullMode.PullNone)
pins.setPull(DigitalPin.P16, PinPullMode.PullNone)
basic.showString(player)
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P2) > 550 && (pins.analogReadPin(AnalogPin.P1) > 400 && pins.analogReadPin(AnalogPin.P1) < 600)) {
        radio.sendValue(player, 1)
        basic.showLeds(`
            . . # . .
            . # . # .
            # . # . #
            . # . # .
            # . . . #
            `)
    } else if (pins.analogReadPin(AnalogPin.P2) < 450 && (pins.analogReadPin(AnalogPin.P1) > 400 && pins.analogReadPin(AnalogPin.P1) < 600)) {
        radio.sendValue(player, 3)
        basic.showLeds(`
            # . . . #
            . # . # .
            # . # . #
            . # . # .
            . . # . .
            `)
    } else if (pins.analogReadPin(AnalogPin.P1) > 550 && (pins.analogReadPin(AnalogPin.P2) > 400 && pins.analogReadPin(AnalogPin.P2) < 600)) {
        radio.sendValue(player, 2)
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
    } else if (pins.analogReadPin(AnalogPin.P1) < 450 && (pins.analogReadPin(AnalogPin.P2) > 400 && pins.analogReadPin(AnalogPin.P2) < 600)) {
        radio.sendValue(player, 4)
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
    } else if (오토상태 == 0) {
        radio.sendValue(player, 0)
    }
    if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        if (1 == 수동잡힌몬) {
            if (m1 == 0) {
                if (randint(1, 3) == 1) {
                    득점처리()
                    m1 = 1
                } else {
                    basic.showString("FAIL")
                }
            }
            catched()
        } else if (2 == 수동잡힌몬) {
            if (m2 == 0) {
                if (randint(1, 2) == 1) {
                    득점처리()
                    m2 = 1
                } else {
                    basic.showString("FAIL")
                }
            }
            catched()
        } else if (3 == 수동잡힌몬) {
            if (m3 == 0) {
                득점처리()
                m3 = 1
            }
            catched()
        } else if (4 == 수동잡힌몬) {
            if (m4 == 0) {
                득점처리()
                m4 = 1
            }
            catched()
        } else if (5 == 수동잡힌몬) {
            if (m5 == 0) {
                득점처리()
                m5 = 1
            }
            catched()
        } else if (6 == 수동잡힌몬) {
            if (m6 == 0) {
                득점처리()
                m6 = 1
            }
            catched()
        } else if (7 == 수동잡힌몬) {
            if (m7 == 0) {
                득점처리()
                m7 = 1
            }
            catched()
        } else if (8 == 수동잡힌몬) {
            if (m8 == 0) {
                득점처리()
                m8 = 1
            }
            catched()
        }
        수동잡힌몬 = 0
    }
    if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        basic.showString("p")
        basic.showNumber(jum)
        basic.showString("M")
        if (m1 == 1) {
            basic.showNumber(1)
        }
        if (m2 == 1) {
            basic.showNumber(2)
        }
        if (m3 == 1) {
            basic.showNumber(3)
        }
        if (m4 == 1) {
            basic.showNumber(4)
        }
        if (m5 == 1) {
            basic.showNumber(5)
        }
        if (m6 == 1) {
            basic.showNumber(6)
        }
        if (m7 == 1) {
            basic.showNumber(7)
        }
        if (m8 == 1) {
            basic.showNumber(8)
        }
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            # . . . .
            `)
    }
})
