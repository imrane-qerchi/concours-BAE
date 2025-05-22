import PocketBase from 'pocketbase'
import { type TypedPocketBase } from './pocketbase-types'

export const pb = new PocketBase(import.meta.env.VITE_PB_API_URL) as TypedPocketBase

pb.collection('users').getFullList()
pb.collection('participants').getFullList()
