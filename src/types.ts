// TODO will export these types from a submodule repo
type Category =
  | "sponsor"
  | "selfpromo"
  | "intro"
  | "outro"
  | "interaction"
  | "preview"
  | "filler"
  | "exclusive_access"
type ActionType = "skip" | "mute" | "full" | "chapter"



interface SegmentData {
  dateSubmitted: string | Date
  /** A YouTube video ID */
  id: string
  isShadowHidden: boolean
  startTime: string
  endTime: string
  length: string
  category: Category
  actionType: ActionType
  /** Will return null in most cases, except if category is submitted as 'chapter'  */
  description: string | null
  /** If locked, the segment takes higher priority than the rest */
  isLocked: boolean
  /** If the submitter is a VIP */
  isVIP: boolean
  /** Whether the segment is hidden due to duration change */
  isHidden: boolean
  /** Submitter's User ID */
  userid: string
  /** Submitter's username, if available */
  username: string | null
  /** UUID of the segment */
  uuid: string
}

export type QueryParams = Partial<{
  videoid: string

  votes_min: number
  votes_max: number

  views_min: number
  views_max: number

  category: Category
  shadowhidden: 0 | 1
  uuid: string
  actiontype: ActionType
  userid: string
}>

export namespace Submissions {
  export type Username = Omit<SegmentData, "username" | "isVIP">
  export type UserID = Omit<SegmentData, "username" | "userid" | "isVIP">
  export type Video = Omit<SegmentData, "id">
  export type UUID = Omit<SegmentData, "uuid"> & {
    userAgent: string
  }
}

export type LockedSegments = Partial<{
  skip: Exclude<Category, "chapter">
  mute: Exclude<Category, "chapter" | "music_offtopic">
  full: Extract<Category, "sponsor" | "selfpromo" | "exclusive_access">
}>
