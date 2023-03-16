import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Modal, Input, Button } from 'antd'
import { StarOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'

import { getPokes } from '../../core/actions/getPokesAction'
import { getPokesData } from '../../core/actions/getPokesDataAction'
import { addStar } from '../../core/actions/addStarAction'
import { postLikePokes } from '../../core/actions/postLikesPokeAction'
import { postOauth } from '../../core/actions/postOauthAction'

import style from './Main.module.scss'

export default function Main() {
  const pokesData = useSelector(({ getPokes: { pokesData } }) => pokesData)
  const pokemons = useSelector(({ getPokes: { pokes } }) => pokes)
  const star = useSelector(({ addStar: { star } }) => star)
  const token = useSelector(({ postOauth: { oauth } }) => oauth)

  const [showPoke, setShowPoke] = useState(null)
  const [filterPoke, setFilterPoke] = useState(null)
  const [foundPoke, setFoundPoke] = useState([])
  const [showOauth, setShowOauth] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPokesData())
  }, [])

  useEffect(() => {
    dispatch(getPokes(pokesData))
  }, [pokesData])

  useEffect(() => {
    const filter = pokemons?.filter(item => item.name === filterPoke)
    setFoundPoke(filter)
  }, [filterPoke])

  useEffect(() => {
    if(foundPoke?.length >= 1){
      setShowPoke(foundPoke)
    }
  }, [foundPoke])

   useEffect(() => {
    if (!localStorage.getItem('oauth')) {
      setShowOauth(true)
    }
    localStorage.setItem('oauth', true)
  }, [])

  const onShowPoke = (value, record, inx) => {
    setShowPoke([record.name, record.icon.props.src])
  }

  const onChangeInput = (e) => {
    setFilterPoke(e.target.value)
  }

  const onAddStar = (value, record, inx) => {
    dispatch(addStar({name: record.name, url: record.icon.props.src}))
  }

  const onShowLikePokes = () => {
    dispatch(postLikePokes())
  }
  
  const navigate = useNavigate()
  const closeAlert = () => {
    setShowAlert(false)
    navigate("/Likes-Poke")
    dispatch(postLikePokes())
  }

  const dataSource = pokemons?.map(items => {
    return {
      key: items[0],
      name: items[0],
      icon: <img src={`${items[1]}`} alt=""/>,
      star: <StarOutlined />
    }
  })
  return (
    <>
      <div className={style.header}>
        <div style={{maxWidth: 300}}>
          <Input
            placeholder='Введите имя покемона'
            onChange={(e) => onChangeInput(e)}
          />
        </div>
        <GoogleLogin
          onSuccess={credentialResponse => {
            dispatch(postOauth(credentialResponse))
            if(credentialResponse){
              setShowOauth(false)
            }
          }}
          onError={() => {
            console.log('Login Failed')
          }}
        />
        {
          token ? <Link to="/Likes-Poke" style={{textDecoration: 'none'}}>
            <div className={style.wrapStar}
              onClick={() => onShowLikePokes()}
            >
              <StarOutlined style={{fontSize: 25}}/>
              <span>Любимые покемоны</span>
            </div>
          </Link> 
          :  <div className={style.wrapStar}
              onClick={() => setShowAlert(true)}
             >
              <StarOutlined style={{fontSize: 25}}/>
              <span>Любимые покемоны</span>
            </div>
        }
      </div>
     
      <Table
        columns = {[
          { dataIndex: 'icon', key: 'icon', title: 'Poke',
            render: (value, record, inx) =>
            <div style={{cursor: 'pointer'}}
              onClick={() => onShowPoke(value, record, inx)}
            ><img src={`${record.icon.props.src}`} alt={record.name}/></div>
          },
          { dataIndex: 'name', key: 'name', title: 'Name',
            render: (value, record, inx) =>
            <div style={{cursor: 'pointer'}}
              onClick={() => onShowPoke(value, record, inx)}
            >{value}</div>
          },
          { dataIndex: 'star', key: 'star', title: 'Star',
            render: (value, record, inx) =>
            <div className={star?.find(item => item.name === record.name) ? style.star : ''}
              onClick={() => onAddStar(value, record, inx)}
            ><StarOutlined style={{fontSize: 20}}/></div>
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
        onCancel={() => setShowPoke(null)}
        maskStyle={{ background: 'rgba(235, 90, 30, 0.3)' }}
        bodyStyle={{ height: 250, padding: 0, borderRadius: '10px'}}
        >
        <div className={style.poke} >
          <div className={style.poke} style={{background: `url(${showPoke?.[0]?.icon}) center center/cover no-repeat`, height: "200px", width: "200px"}}></div>
          <h2>{showPoke?.[0]?.name}</h2>
        </div>
      </Modal>
      <Modal
        open={showAlert}
        closable={false}
        footer={null}
        centered={true}
        width={300}
        mask={true}
        onCancel={() => setShowAlert(false)}
        bodyStyle={{ height: 200, padding: 0, borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
        <div className={style.wrapAlert}> 
          <span>Вы не авторизованы <br/> Однако функция авторизации работает некорректно и вы можете посмотреть любимых покемонов без нее</span><br/>
          <div style={{width: '100%'}}>
            <Button type="primary" 
              onClick={() => closeAlert()}
            >OK</Button>
          </div>
        </div>
      </Modal>
      <Modal
        open={showOauth}
        closable={false}
        footer={null}
        centered={true}
        width={300}
        mask={true}
        onCancel={()=> setShowOauth(false)}
        bodyStyle={{ height: 150, padding: 0, borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
        <GoogleLogin
          onSuccess={credentialResponse => {
            dispatch(postOauth(credentialResponse))
            if(credentialResponse){
              setShowOauth(false)
            }
          }}
          onError={() => {
            console.log('Login Failed')
          }}
        />
      </Modal>
    </>
  )
}
