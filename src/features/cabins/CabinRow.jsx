import styled from 'styled-components'
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineDocumentDuplicate,
} from 'react-icons/hi2'

import { useDeleteCabin } from './useDeleteCabin'
import { useCreateCabin } from './useCreateCabin'

import { formatCurrency } from '../../utils/helpers'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import CreateCabinForm from './CreateCabinForm'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin()
  const { createCabin } = useCreateCabin()
  const {
    id: cabinID,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin
  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    })
  }
  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div className="">Fits up to tp {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinID} />

            <Menus.List id={cabinID}>
              <Menus.Button
                icon={<HiOutlineDocumentDuplicate />}
                onClick={handleDuplicate}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open openItem="update-form">
                <Menus.Button icon={<HiOutlinePencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open openItem="confirmDelete">
                <Menus.Button icon={<HiOutlineTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="update-form">
              <CreateCabinForm cabinToUpdate={cabin} />
            </Modal.Window>

            <Modal.Window name="confirmDelete">
              <ConfirmDelete
                onConfirm={() => deleteCabin(cabinID)}
                resourceName={name}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  )
}

export default CabinRow
