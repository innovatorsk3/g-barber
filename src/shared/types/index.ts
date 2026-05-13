export interface NavItem {
  label: string
  to: string
  key: string
}

export interface GatewayItem {
  kicker: string
  title: string
  desc: string
  to: string
  img: string
  iconKey: string
}

export interface FeaturedItem {
  name: string
  tag: string
  price: string
  blurb: string
  img: string
}

export interface UspItem {
  iconKey: string
  title: string
  desc: string
}

export interface TeamMember {
  name: string
  role: string
  img: string
}

export interface Review {
  name: string
  text: string
}

export interface Branch {
  id: number
  name: string
  addr: string
  img: string
}

export interface Service {
  tag: string
  name: string
  price: string
  time: string
  img: string
  desc: string
  includes: string[]
}

export interface FaqItem {
  k: string
  v: string
}

export interface Product {
  cat: string
  name: string
  sub: string
  price: string
  old?: string
  tag?: string
  img: string
}

export interface Bundle {
  name: string
  sub: string
  price: string
  oldPrice: string
  desc: string
  img: string
}

export interface Course {
  level: string
  weeks: string
  price: string
  name: string
  img: string
  desc: string
  units: string[]
}

export interface FacultyMember {
  name: string
  role: string
  years: string
  img: string
}

export interface ProcessStep {
  n: string
  k: string
  v: string
}

export interface Role {
  dept: string
  title: string
  base: string
  type: string
  salary: string
  bullets: string[]
}

export interface Perk {
  k: string
  v: string
}
