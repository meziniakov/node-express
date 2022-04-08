import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useMessage } from '../../hooks/message.hook';

const DomainTrack = props => (
  <tr>
    <td>{props.domain.domain}</td>
    <td>{props.domain.traffic}</td>
    <td>{props.domain.organic}</td>
    <td>{props.domain.direct}</td>
    <td>{props.domain.date.substring(0, 10)}</td>
    <td>
      <Link
        to={'/edit/' + props.domain._id}
        style={{ color: ' #a04949' }}
      ></Link>
      <Link
        onClick={() => {
          props.deleteDomain(props.domain._id);
          // window.location.reload(false);
        }}
        style={{ color: ' #a04949' }}
      >
        Удалить
      </Link>
    </td>
  </tr>
);

const DomainList = () => {
  const [domains, setDomains] = useState([]);
  const message = useMessage();

  useEffect(() => {
    axios
      .get('/api/domain/')
      .then(response => {
        console.log(response.data);
        setDomains(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [setDomains]);

  function deleteDomain(id) {
    axios.delete('/api/domain/' + id).then(response => {
      console.log(response.data.message);
      message(response.data.message);
      setDomains(domains.filter(el => el._id !== id));
    });
  }

  const domainList = () => {
    return domains.map(currentdomain => {
      return (
        <DomainTrack
          domain={currentdomain}
          deleteDomain={deleteDomain}
          key={currentdomain._id}
        />
      );
    });
  };

  return (
    <>
      <>
        <div className="container">
          <div className="card border-0 shadow my-4">
            <div className="card-body p-5">
              <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>
                Список доменов
              </h3>
              <table className="table" style={{ textAlign: 'center' }}>
                <thead className="thead" style={{ backgroundColor: '#8661d1' }}>
                  <tr>
                    <th>👤 Domain</th>
                    <th>📙 Traffic</th>
                    <th>🔥 Direct</th>
                    <th>🔥 Organic</th>
                    <th>📅 Date</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>{domainList()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default DomainList;
