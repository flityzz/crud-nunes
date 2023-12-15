import Table from '@/components/Table'
import Form from '@/components/Form'
import { useState } from 'react'

import { RefreshTableContext } from '@/contexts/RefreshTableContext';

export default function Home() {

  const [refresh, setRefresh] = useState(false);
  return (
    <>
      <RefreshTableContext.Provider value={{ refresh, setRefresh }}>
        <Form />
        <Table />
      </RefreshTableContext.Provider>
    </>
  )
}
