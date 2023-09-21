import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import { formatCurrency } from '../../utils/helpers'
import { deleteCabin } from '../../services/apiCabins'
import CreateCabinForm from './CreateCabinForm'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`

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
  const [showForm, setShowform] = useState(false)
  const { id: cabinId, name, maxCapacity, regularPrice, discount, image } = cabin

  // Delete cabin using react query
  const queryClient = useQueryClient()
  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success('Cabin successfully deleted')

      // invalidate the query, so the data will be refetch when it is updated
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
    },
    onError: (err) => toast.error(err.message),
  })

  return (
    <>
      <TableRow>
        <Img src={image} alt={`cabin${cabinId}`} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button onClick={() => setShowform((show) => !show)}>Edit</button>
          <button onClick={() => mutate(cabinId)} disabled={isLoading}>
            Delete
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  )
}

export default CabinRow