export interface IDevice {
    name: string,
    trustedState: number,
    channels: string[],
    history: [
        {
            timestamp: number,
            trustedState: number,
        },
    ],
    sensors: [
        {
            name: string,
            sensorData: [
                {
                    sensorValue: any,
                    timestamp: number,
                },
            ],
        },
    ],
}