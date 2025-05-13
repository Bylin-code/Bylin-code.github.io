---
layout: post
featured: true
title: "PulseMachine"
date: 2025-05-12
project_code: "PULSE"
thumbnail: "/assets/project-assets/PulseMachine/thumbnail.jpg"
intro: "Pulse Machine is a fully autonomous robotic drummer designed to bring mechanical precision to live percussion. With six independent drumsticks, synchronized torso swaying, and head-bopping animations, it bridges the gap between robotics and musical expression. This project explores rhythmic automation in a way that feels both industrial and lifelike."
---

## Pulse Machine: The Autonomous Robotic Drummer

Pulse Machine is a groundbreaking project aimed at pushing the boundaries of robotic percussion. Designed with six independently controlled drummer arms, a swaying torso, and a head that bops to the rhythm, it captures both the mechanical precision of robotics and the raw energy of live drumming.

![Full Setup](/assets/project-assets/PulseMachine/full_setup.jpg)

## Purpose and Vision

The purpose of Pulse Machine is to explore the intersection of mechanical engineering and musical expression. Traditional drum machines are limited to electronic sounds and pre-sequenced patterns. Pulse Machine, however, physically strikes real drums with the accuracy of a machine and the fluidity of human-like gestures. The result is an experience that is both visually and sonically engaging.

![Performance Setup](/assets/project-assets/PulseMachine/performance_setup.jpg)

## Design and Construction

Pulse Machine is built on a robust frame with six independent arms controlled by servo motors, each calibrated for precise speed and force. The torso mechanism, driven by stepper motors, sways in sync with the rhythm, adding a layer of performative motion. Its head is designed to mimic the natural bopping of a human drummer, providing a sense of life and character.

**Key Components:**

- **Six Drum Arms:** Individually controlled by high-torque servos for independent rhythm patterns.
- **Torso Mechanism:** Stepper motor-driven for synchronized swaying.
- **Head Animation:** Servos controlling subtle head bops, synced to tempo.
- **MIDI Integration:** Receives MIDI signals for real-time beat control and synchronization.
- **Custom Software:** Designed for pattern sequencing, tempo adjustments, and dynamic velocity control.

![Arm Mechanics](/assets/project-assets/PulseMachine/arm_mechanics.jpg)

### Arm Design

Each arm is constructed with aluminum rods for lightweight movement, reinforced with acrylic joints to reduce flex during high-speed strikes. The servos are mounted on shock-absorbing pads to minimize vibration, ensuring consistent impact force on each hit.

![Servo Mounting](/assets/project-assets/PulseMachine/servo_mounting.jpg)

### Torso and Head Animation

The torso utilizes a dual-stepper mechanism, inspired by gimbal stabilizers, allowing for fluid left-to-right swaying. The head is mounted on a micro-servo with a feedback loop to sync with rhythmic changes, enhancing its lifelike motion.

![Torso Design](/assets/project-assets/PulseMachine/torso_design.jpg)

## How It Works

Pulse Machine listens to MIDI signals sent from any digital audio workstation (DAW). Each drum arm can be mapped to a specific MIDI note, allowing it to follow complex patterns and dynamic changes in real-time. The torso and head are synchronized to reflect the groove, amplifying the visual experience.

A typical setup involves:

1. Connecting Pulse Machine to a DAW via USB-MIDI.
2. Assigning each drum arm to a MIDI note.
3. Sequencing drum patterns in the DAW to control Pulse Machine's movements.
4. Adjusting parameters for swaying speed and head bopping intensity.

![MIDI Control](/assets/project-assets/PulseMachine/midi_control.jpg)

## Assembly Guide

Building Pulse Machine requires:

1. **Servo Motors:** 6x High Torque (MG996R or equivalent)
2. **Stepper Motors:** 2x NEMA 17 for torso movement
3. **Microcontroller:** Teensy 4.1 with MIDI USB capabilities
4. **Power Supply:** 12V 5A for motors and logic
5. **Frame Construction:** Aluminum and acrylic for lightweight and stability

Wiring diagrams and detailed assembly instructions are included in the [Build Guide](/assets/project-assets/PulseMachine/build_guide.pdf).

![Wiring Diagram](/assets/project-assets/PulseMachine/wiring_diagram.jpg)

## Troubleshooting and Optimization

- **Servo Drift:** If arm positions are inconsistent, recalibrate the PWM signals from the controller.
- **Stepper Stutter:** If torso movement is jerky, adjust the step intervals and check motor alignment.
- **MIDI Latency:** Ensure USB-MIDI drivers are updated and DAW latency compensation is configured.

![Troubleshooting](/assets/project-assets/PulseMachine/troubleshooting.jpg)

## Future Improvements

Planned upgrades include:

- Dynamic velocity sensing for more expressive drumming
- Bluetooth MIDI support for wireless control
- Expandable limb configurations for complex percussive setups

![Future Design](/assets/project-assets/PulseMachine/future_design.jpg)

## Conclusion

Pulse Machine redefines what is possible with robotic percussion. It’s not just a machine—it’s a performer. Whether for live shows or experimental music projects, its precision and lifelike movements make it a standout piece of engineering and musical artistry.

For more details, see the [Full Documentation](/assets/project-assets/PulseMachine/full_documentation.pdf).

---

Interested in building one? Check out the [Build Guide](/assets/project-assets/PulseMachine/build_guide.pdf) and bring Pulse Machine to life.
