import { useState } from 'react';
import toast from 'react-hot-toast';
import { deleteCourse } from '../../api/course.api';
import ContentComponent from '../../components/ContentComponent';
import HeaderAddElementComponent from '../../components/HeaderAddElementComponent';
import ModalConfirm from '../../components/Modal/Confirm';
import Panigation from '../../components/React-table/Panigation';
import TableList from '../../components/React-table/Table';
import useLoader from '../../hooks/useLoader';
import UseReactTable from '../../hooks/useReactTable';
import useTitle from '../../hooks/useTitle';
import BaseLayoutContent from '../../layout/BaseLayoutContent';
import ModalAddCourse from './ModalAddCourse';
import ModalEditCourse from './ModalEditCourse';
import useColumnCourse from './hooks/useColumnCourse';
import useFetchCourse from './hooks/useFetchCourse';

function Course() {
    const { loading } = useLoader()
    useTitle();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalConfirmDeleteOpen, setIsModalConfirmDeleteOpen] = useState(false);

    const { courses } = useFetchCourse({
        isModalConfirmDeleteOpen,
        isModalEditOpen,
        isModalOpen
    })
    const [idSelected, setIdSelected] = useState<null | number>(null)
    const { columns, idDelete } = useColumnCourse({
        setIdSelected,
        setIsModalEditOpen,
        setIsModalConfirmDeleteOpen
    })

    const handleAdd = () => {
        setIsModalOpen(true)
    }

    const handleDelete = async () => {
        try {
            await deleteCourse(Number(idDelete));
          } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }

    const { table } = UseReactTable({
        columns,
        data: courses??[]
    })

    return (
        <ContentComponent 
            data={courses}
            loading={loading}
            message='Chưa có khóa học nào'
        >
            <HeaderAddElementComponent 
                handleAdd={handleAdd}
                isButtonImportExcell={false}
            />  
            <div className='react-table'>
                {courses.length > 0 &&
                    <BaseLayoutContent>
                        <div className='student'>
                            <TableList table={table}/>
                            <div className="h-2" />
                            <Panigation table={table} />                
                        </div>
                    </BaseLayoutContent>
                }

                {isModalOpen &&
                    <ModalAddCourse
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                } 

                {isModalEditOpen && idSelected &&
                    <ModalEditCourse
                        isModalOpen={isModalEditOpen}
                        setIsModalOpen={setIsModalEditOpen}
                        id={idSelected}
                    />
                } 


                {isModalConfirmDeleteOpen &&
                    <ModalConfirm 
                        isOpen={isModalConfirmDeleteOpen} 
                        setIsOpen={setIsModalConfirmDeleteOpen} 
                        handle={handleDelete}
                        message={'Xác nhận xóa?'}
                    />
                }
            </div>                  
        </ContentComponent>
    )
}

export default Course