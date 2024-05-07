'use client'

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';

const Info = () => {

  const [patientInfo, setPatientInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        //const case_id = new URLSearchParams(window.location.search).get('case_id');
        const case_id = Cookies.get('patientId');
        console.log(case_id)

        if (!case_id) {
            setError('缺少病历号参数');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`/api/login?case_id=${case_id}`);
            if (!response.ok) {
                throw new Error('请求失败');
            }
            const data = await response.json();
            if ( !data || data.length === 0) {
                throw new Error('未找到患者信息');
            }
            setPatientInfo(data.data[0]);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
  }, []);

  if (loading) {
      return <div>Loading...</div>;
  }

  if (error) {
      return <div>{error}</div>;
  }

  if (!patientInfo) {
      return null;
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-background p-8 mt-6">
        <div>病历号：{patientInfo.pid}</div>
        <div>姓  名：{patientInfo.name}</div>
    </div>
  )
}

export default Info