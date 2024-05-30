import { useAppContext } from "@/components/AppContext"
import Button from "@/components/common/Button"
import { ActionType } from "@/reducers/AppReducer"
import { HiPlus } from "react-icons/hi"
import { LuPanelLeft } from "react-icons/lu"

export default function Menubar() {
    const { dispatch } = useAppContext()
    return (
        <div className='flex space-x-3'>
            <Button
                icon={HiPlus}
                variant='outline'
                className='flex-1'
                onClick={() => {
                    dispatch({
                        type: ActionType.UPDATE,
                        field: "selectedChat",
                        value: null
                    })
                    dispatch({
                        type: ActionType.UPDATE,
                        field: "messageList",
                        value: []
                    })
                }}
            >
                新建对话
            </Button>
        </div>
    )
}
