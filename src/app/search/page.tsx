'use client'

import { gql, useLazyQuery } from '@apollo/client'
import client from '@/lib/apollo-client'
import { useState } from 'react'

// 定义 GraphQL 查询语句（示例）
const SEARCH_QUERY = gql`
  query SearchItems($keyword: String!) {
    search(keyword: $keyword) {
      id
      title
      description
    }
  }
`

export default function SearchPage() {
  const [keyword, setKeyword] = useState('')
  const [search, { data, loading, error }] = useLazyQuery(SEARCH_QUERY)

  const handleSearch = () => {
    if (keyword.trim() !== '') {
      search({ variables: { keyword } })
    }
  }

  return (
    <div className="p-4">
      <h1 className="mb-3">GraphQL Search</h1>

      <input
        type="text"
        className="form-control mb-2"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword..."
      />
      <button className="btn btn-primary mb-4" onClick={handleSearch}>
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <ul>
        {data?.search?.map((item: any) => (
          <li key={item.id}>
            <strong>{item.title}</strong>: {item.description}
          </li>
        ))}
      </ul>
    </div>
  )
}
