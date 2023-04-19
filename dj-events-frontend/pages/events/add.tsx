import React,{useState} from 'react'
import {useRouter}from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import {API_URL} from '@/config/index'

export default function AddEventPage() {
  return (
    <Layout title="Add New Event">
      <h1>AddEventPage</h1>
      </Layout>
  )
}
