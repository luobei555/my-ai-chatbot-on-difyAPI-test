"use client"

import React, { useState } from 'react';

const login = () => {
    const [errorMessage, setErrorMessage] = useState('');

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // 阻止表单默认提交行为
        const caseId = document.getElementById("case_id") as HTMLInputElement;
        const name = document.getElementById("name") as HTMLInputElement;
        const response = await fetch(`/api/login?case_id=${encodeURIComponent(caseId.value)}`);
        const data = await response.json();
        if (response.ok) {
            const patient = data.data[0]; // 获取匹配的患者信息
			console.log(patient)
            if (patient && patient.name === name.value) {
                if (typeof window !== 'undefined') {
                    window.location.href = `/patient/${encodeURIComponent(caseId.value)}`;
                }
            } else {
                setErrorMessage("病历号与姓名不匹配");
            }
        } else {
            console.error("登录失败");
        }
    }

    return (
        <div className="bg-[#ECECEE] min-h-screen flex justify-center items-center">
            <div className="w-full max-w-xl mx-auto">
                <h1 className="text-center text-2xl font-bold mb-4">问诊系统登录界面</h1>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            病历号
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="case_id" type="text" placeholder="病历号" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            姓名
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="姓名" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            登录
                        </button>
                    </div>
                </form>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default login;
