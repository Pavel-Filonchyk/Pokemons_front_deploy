import React from 'react'
import {Link} from 'react-router-dom'
import { Table } from 'antd'
import { useSelector } from 'react-redux'
import _ from 'lodash'

export default function LikePokes() {

  const likePokes = useSelector(({ getLikePokes: { likePokes } }) => likePokes)
  console.log(likePokes)

  const dataSource = _.map(likePokes.pokes, items => {
    return {
      key: items.name,
      name: items.name,
      icon: <img src={`${items.url}`} alt=""/>,
    }
  })
  return (
    <>
      <Link to="/" style={{textDecoration: 'none', color: 'yellowgreen'}}>
          <span>На главную</span>
      </Link> 
      <Table
        columns = {[
          { dataIndex: 'icon', key: 'icon', title: 'Poke'},
          { dataIndex: 'name', key: 'name', title: 'Name'}
          ]}
          dataSource={dataSource}
          pagination={{ defaultPageSize: 10 }}
      />
    </>
  )
}
