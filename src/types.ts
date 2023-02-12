export type GoalResponse = Goal[] | GoalErrorNoToken | GoalErrorBadToken | undefined;

export interface Preferences {
  beeminderApiToken: string;
  beeminderUsername: string;
}

export interface GoalErrorNoToken {
  errors: {
    message: string;
    token: string;
  };
}

export interface GoalErrorBadToken {
  auth_token: string;
  message: string;
}

export interface Goal {
  slug: string;
  title: string;
  description: string;
  goalval: null;
  rate: number;
  goaldate: number;
  svg_url: string;
  graph_url: string;
  thumb_url: string;
  goal_type: string;
  autodata: string;
  healthkitmetric: string;
  autodata_config: Autodata_config;
  losedate: number;
  deadline: number;
  leadtime: number;
  alertstart: number;
  use_defaults: boolean;
  id: string;
  ephem: boolean;
  queued: boolean;
  panic: number;
  updated_at: number;
  burner: string;
  yaw: number;
  lane: number;
  delta: number;
  runits: string;
  limsum: string;
  frozen: boolean;
  lost: boolean;
  won: boolean;
  contract: Contract;
  delta_text: string;
  safebump: number;
  safesum: string;
  limsumdate: string;
  limsumdays: string;
  baremin: string;
  baremintotal: string;
  roadstatuscolor: string;
  lasttouch: string;
  safebuf: number;
  coasting: boolean;
  integery: boolean;
  fineprint: null;
  todayta: boolean;
  hhmmformat: boolean;
  gunits: string;
  weekends_off: boolean;
  yaxis: string;
  maxflux: null;
  tmin: null;
  tmax: null;
  initday: number;
  initval: number;
  curday: number;
  curval: number;
  lastday: number;
  dir: number;
  kyoom: boolean;
  odom: boolean;
  noisy: boolean;
  aggday: string;
  plotall: boolean;
  steppy: boolean;
  rosy: boolean;
  movingav: boolean;
  aura: boolean;
  numpts: number;
  road: any[];
  roadall: any[];
  fullroad: any[];
  secret: boolean;
  pledge: number;
  mathishard: number[];
  headsum: string;
  datapublic: boolean;
  graphsum: string;
  rah: number;
  last_datapoint: Last_datapoint;
  callback_url: null;
  tags: any[];
  recent_data: RecentDataItem[];
  dueby: any[];
}
interface Autodata_config {
  name: string;
  note: string;
}
interface Contract {
  amount: number;
  stepdown_at: null;
  pending_amount: null;
  pending_at: null;
}
interface Last_datapoint {
  timestamp: number;
  value: number;
  comment: string;
  id: string;
  updated_at: number;
  requestid: null;
  canonical: string;
  fulltext: string;
  origin: string;
  creator: string;
  daystamp: string;
}
interface RecentDataItem {
  id: string;
  fulltext: string;
  canonical: string;
  origin: string;
  urtext: null;
  measured_at: string;
  created_at: string;
  comment: string;
  value: number;
  daystamp: string;
}

export interface DataPointResponse {
  timestamp: number;
  value: number;
  comment: string;
  id: string;
  updated_at: number;
  requestid: null;
  canonical: string;
  fulltext: string;
  origin: string;
  creator: string;
  daystamp: string;
  status: string;
}