export interface DriveRequest {
  heartbeat_count: number;
  is_operational: number;
  drive_mode: string;
  speed: number;
  angle: number;
}

export interface DriveStatus {
  heartbeat_count: number;
  is_operational: number;
  drive_mode: string;
  battery: number;
  left_wheel_speed: number;
  left_wheel_angle: number;
  right_wheel_speed: number;
  right_wheel_angle: number;
  back_wheel_speed: number;
  back_wheel_angle: number;
}
