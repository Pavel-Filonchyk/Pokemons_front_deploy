import React from 'react'
import {Table, Modal, Input, Button, Select} from 'antd'

export default function Pokes({pokemons}) {
    //console.log(pokemons)
    // const dataSource = pokemons?.map(items => {
    //   return {
    //     key: items.name,
    //     name: items.name
    //   }
    // })
    // console.log(dataSource)
    // [
    //   {
    //     key: '1',
    //     name: 'Mike',
    //   }
    // ]
  return (
    <div>{pokemons.name}
    
    {/* <Table
        columns = {[
          { dataIndex: 'name', key: 'name', title: 'Name', align: 'center', },
        ]}
          dataSource={pokemons}
    /> */}
  </div>
  )
}
