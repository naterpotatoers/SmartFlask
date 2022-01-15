export interface ArmRequest {
  heartbeat_count: number;
  is_operational: number;
  arm_speed: number;
  rotunda_angle: number;
  shoulder_angle: number;
  elbow_angle: number;
  wrist_roll: number;
  wrist_pitch: number;
  pinky_angle: number;
  ring_angle: number;
  middle_angle: number;
  pointer_angle: number;
  thumb_angle: number;
}

export interface ArmStatus {
  heartbeat_count: number;
  is_operational: number;
  arm_speed: number;
  battery: number;
  rotunda_angle: number;
  shoulder_angle: number;
  elbow_angle: number;
  wrist_roll: number;
  wrist_pitch: number;
  pinky_angle: number;
  ring_angle: number;
  middle_angle: number;
  pointer_angle: number;
  thumb_angle: number;
}
