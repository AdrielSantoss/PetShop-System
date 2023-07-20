import { BsSearch, BsFillCalendarCheckFill } from 'react-icons/bs';
import { MdPets } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import { HiLocationMarker } from 'react-icons/hi';
import { Button, Modal } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Header, Footer, Table, Form } from '../../components';

interface PetShopData {
  id: number | string;
  first: string;
  last: string;
  handle: string;
}

const tableData: PetShopData[] = [
  {
    id: 1,
    first: 'Mark',
    last: 'Otto',
    handle: '@mdo',
  },
  {
    id: 2,
    first: 'Jacob',
    last: 'Thornton',
    handle: '@fat',
  },
  {
    id: 3,
    first: 'Larry',
    last: 'the Bird',
    handle: '@twitter',
  },
];

const tableHeaders = Object.keys(tableData[0]).map((key) =>
  key === 'id' ? '#' : key
);

const createScheduleSchema = z.object({
  idPetShop: z.string().transform((id) => Number(id)),
  pet: z.string().nonempty('Selecione um pet'),
  date: z
    .string()
    .transform((data) => new Date(data))
    .refine((data) => data.getTime() >= Date.now(), {
      message: 'Data tem que ser maior que data atual',
    }),
  service: z.string().nonempty('Selecione um serviço'),
  warning: z.string().optional(),
});

type CreateScheduleData = z.infer<typeof createScheduleSchema>;

export function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [petShopSelected, setPetShopSelected] = useState({} as PetShopData);

  const createScheduleForm = useForm<CreateScheduleData>({
    resolver: zodResolver(createScheduleSchema),
  });

  const {
    handleSubmit,
    formState: { isLoading },
  } = createScheduleForm;

  const createSchedule = (data: CreateScheduleData) => {
    console.log(data);
  };

  const handleOpenModal = (petShopData: PetShopData) => {
    setOpenModal(true);
    setPetShopSelected(petShopData);
  };

  return (
    <div>
      {/* TODO: REMOVER HEADER DAQUI, CRIAR UM BASE TEMPLATE (COM HEADER E NAVBAR/SIDEBAR) */}
      <Header />

      <div className="row m-3">
        <div className="col-12">
          <div className="card mt-3 shadow">
            <div className="card-header bg-success text-white p-4">
              <div className="row">
                <div className="col-4 text-white">
                  <h3>
                    <BsSearch size={30} /> PetShops Próximas
                  </h3>
                </div>
                <div className="col-4">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text bg-light"
                        id="basic-addon1"
                      >
                        <BsSearch size={30} />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Encontre Petshops próximas"
                    />
                  </div>
                </div>
                <div className="col-4 text-center">
                  <div className="text-center">
                    <HiLocationMarker color="white" size={25} />
                  </div>
                  <small>Eldorado do sul, RS</small>
                </div>
              </div>
            </div>

            <div className="card-body p-0">
              <Table.Root striped>
                <Table.Head>
                  <Table.Row>
                    <Table.Headers headers={tableHeaders} />
                  </Table.Row>
                </Table.Head>

                <Table.Body>
                  {tableData.map((data) => (
                    <Table.Row key={data.id}>
                      <Table.Cells data={data} />
                      <td>
                        <Button onClick={() => handleOpenModal(data)}>
                          Agendar
                        </Button>
                      </td>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </div>
          </div>
        </div>
        <div className="col-2" />
      </div>

      <Modal show={openModal} onHide={() => setOpenModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Pet Shop
            <span className="text-success"> {petShopSelected.first}</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormProvider {...createScheduleForm}>
            <Form.Root onSubmit={handleSubmit(createSchedule)}>
              <Form.Input name="idPetShop" value={petShopSelected.id} hidden />

              <Form.Field>
                <Form.Label htmlFor="pet">Escolha seu animal</Form.Label>
                <Form.Select name="pet">
                  <option value="cat">Gato</option>
                  <option value="dog">Cachorro</option>
                </Form.Select>
                <Form.ErrorMessage field="pet" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="date">Escolha seu animal</Form.Label>
                <Form.Input name="date" type="date" />
                <Form.ErrorMessage field="date" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="service">Escolha seu animal</Form.Label>
                <Form.Select name="service">
                  <option value="bath">Banho</option>
                  <option value="tosa">SÓ TOSA</option>
                  <option value="depilation">Depilação</option>
                  <option value="daycare">Daycare (creche)</option>
                </Form.Select>
                <Form.ErrorMessage field="service" />
              </Form.Field>

              <Form.Button isLoading={isLoading} text="Agendar" />
            </Form.Root>
          </FormProvider>
        </Modal.Body>
      </Modal>

      {/* TODO: COMPONENTIZAR CARDS */}
      <div className="row m-3 mt-5">
        <div className="col-3">
          <div
            className="card shadow bg-success d-flex justify-content-center align-items-center text-white"
            style={{ height: '300px' }}
          >
            <MdPets size={100} color="white" />
            <h4 className="mt-5">Meus PETS</h4>
          </div>
        </div>
        <div className="col-3">
          <div
            className="card shadow bg-success d-flex justify-content-center align-items-center text-white"
            style={{ height: '300px' }}
          >
            <BsFillCalendarCheckFill size={100} color="white" />
            <h4 className="mt-5">Agendamentos</h4>{' '}
          </div>
        </div>
        <div className="col-3">
          <div
            className="card shadow bg-success d-flex justify-content-center align-items-center text-white"
            style={{ height: '300px' }}
          >
            <ImProfile size={100} color="white" />
            <h4 className="mt-5">Minha conta</h4>{' '}
          </div>
        </div>
        <div className="col-3">
          <div
            className="card shadow bg-success d-flex justify-content-center align-items-center text-white"
            style={{ height: '300px' }}
          >
            <SiHomeassistantcommunitystore size={100} color="white" />
            <h4 className="mt-5">Minha empresa</h4>{' '}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
