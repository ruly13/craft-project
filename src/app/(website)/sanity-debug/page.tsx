"use client"

import { useEffect, useState } from 'react'
import { createClient } from 'next-sanity'

export default function DebugPage() {
  const [status, setStatus] = useState<any>('Checking...')
  const [fetchResult, setFetchResult] = useState<any>(null)
  const [configCheck, setConfigCheck] = useState<any>(null)

  useEffect(() => {
    async function checkSanity() {
      try {
        // 1. Direct Fetch Check
        const url = 'https://2819wsin.api.sanity.io/v2021-06-07/users/me?tag=sanity.studio.users.get-current'
        console.log('Fetching:', url)
        
        const res = await fetch(url, {
          headers: {
            'Accept': 'application/json'
          }
        })
        
        const data = await res.json().catch(() => null)
        
        setFetchResult({
          ok: res.ok,
          status: res.status,
          statusText: res.statusText,
          data
        })

        if (res.ok || res.status === 401) {
             setStatus('Connection Successful (401 is normal for unauthenticated requests)')
        } else {
             setStatus(`Direct Fetch Failed: ${res.status}`)
        }

      } catch (err: any) {
        console.error(err)
        setFetchResult({
          error: true,
          message: err.message,
          name: err.name
        })
        setStatus('Network Error (Blocked by Browser/Extension or Firewall)')
      }
    }

    checkSanity()
  }, [])

  return (
    <div style={{ padding: 40, fontFamily: 'monospace' }}>
      <h1>Sanity Connection Debugger</h1>
      
      <div style={{ marginBottom: 20, padding: 20, background: '#f0f0f0', borderRadius: 8 }}>
        <h2>Status: {status}</h2>
      </div>

      <h3>Detailed Fetch Result:</h3>
      <pre style={{ background: '#333', color: '#fff', padding: 20, borderRadius: 8, overflow: 'auto' }}>
        {JSON.stringify(fetchResult, null, 2)}
      </pre>

      <div style={{ marginTop: 20 }}>
        <h3>Troubleshooting Tips:</h3>
        <ul>
          <li>If <strong>message</strong> says "Failed to fetch", "NetworkError", or similar:
            <ul>
              <li><strong>AdBlocker?</strong> Turn it off.</li>
              <li><strong>Brave Shields?</strong> Turn it off.</li>
              <li><strong>Antivirus/Firewall?</strong> Check if it blocks API calls.</li>
            </ul>
          </li>
          <li>If status is <strong>401 Unauthorized</strong>:
            <ul>
                <li>This is actually GOOD. It means you CAN connect to Sanity, you just aren't logged in yet. The text "isNetworkError: true" should NOT appear if you get a 401.</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}
