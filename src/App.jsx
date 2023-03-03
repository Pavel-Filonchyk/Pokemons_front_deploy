import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Modal, Input } from 'antd'
import { getPokes } from './core/actions/getPokesAction'
import { getPokesData } from './core/actions/getPokesDataAction'
import style from './App.module.scss'

export default function App() {
  const pokesData = useSelector(({ getPokes: { pokesData } }) => pokesData)
  const pokemons = useSelector(({ getPokes: { pokes } }) => pokes)

  const [showPoke, setShowPoke] = useState(null)
  const [filterPoke, setFilterPoke] = useState(null)
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPokesData())
  }, [])

  useEffect(() => {
    dispatch(getPokes(pokesData))
  }, [pokesData])

  const onShowPoke = (value, record, inx) => {
    console.log(record)
    setShowPoke([record.name, record.icon.props.src])
  }

  const ref = useRef()
  const closeModalPreview = (event) => {
    const domNode = ref.current
    if (!domNode || !domNode.contains(event.target)) {
      setShowPoke(null)
    }
  }

  const onChangeInput = (e) => {
    setFilterPoke(e.target.value)
  }

  const dataSource = pokemons?.map(items => {
    return {
      key: items[0],
      name: items[0],
      icon: <img src={`${items[1]}`} alt=""/>
    }
  })
  return (
    <div>
      <Input
        placeholder='Введите'
        //value={}
        onChange={(e) => onChangeInput(e)}
      />
      <Table
        columns = {[
          { dataIndex: 'icon', key: 'name', title: 'Poke',
            render: (value, record, inx) =>
            <div style={{cursor: 'pointer'}}
              onClick={() => onShowPoke(value, record, inx)}
            >{value}</div>
          },
          { dataIndex: 'name', key: 'name', title: 'Name',
            render: (value, record, inx) =>
            <div style={{cursor: 'pointer'}}
              onClick={() => onShowPoke(value, record, inx)}
            >{value}</div>
          },
          ]}
          dataSource={dataSource}
          pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50']}}
      />
      <Modal
        open={showPoke}
        closable={false}
        footer={null}
        centered={true}
        width={300}
        mask={true}
        onCancel={closeModalPreview}
        maskStyle={{ background: 'rgba(235, 90, 30, 0.3)' }}
        bodyStyle={{ height: 250, padding: 0, borderRadius: '10px'}}
        >
        <div className={style.poke} >
          <div className={style.poke} style={{background: `url(${showPoke?.[1]}) center center/cover no-repeat`, height: "200px", width: "200px"}}></div>
          <h2>{showPoke?.[0]}</h2>
        </div>
      </Modal>
    </div>
  )
}

