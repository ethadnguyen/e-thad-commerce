'use client';

import Image from 'next/image';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { products } from '../../data/products';

export default function BuilderPage() {
  const [selectedComponents, setSelectedComponents] = useState([]);

  const categories = [...new Set(products.map((product) => product.category))];

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceCategory = result.source.droppableId;
    const destinationCategory = result.destination.droppableId;

    if (sourceCategory !== 'selected' && destinationCategory === 'selected') {
      const component = products.find(
        (p) => p.id.toString() === result.draggableId
      );
      setSelectedComponents([...selectedComponents, component]);
    } else if (
      sourceCategory === 'selected' &&
      destinationCategory !== 'selected'
    ) {
      setSelectedComponents(
        selectedComponents.filter((c) => c.id.toString() !== result.draggableId)
      );
    }
  };

  const totalPrice = selectedComponents.reduce(
    (sum, component) => sum + component.price,
    0
  );

  return (
    <div className='space-y-8'>
      <h1 className='text-3xl font-bold'>PC Builder</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-8'>
            {categories.map((category) => (
              <div key={category}>
                <h2 className='text-2xl font-semibold mb-4'>{category}</h2>
                <Droppable droppableId={category}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className='grid grid-cols-1 sm:grid-cols-2 gap-4'
                    >
                      {products
                        .filter((p) => p.category === category)
                        .map((component, index) => (
                          <Draggable
                            key={component.id}
                            draggableId={component.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className='bg-secondary border-primary'
                              >
                                <CardHeader>
                                  <CardTitle>{component.name}</CardTitle>
                                </CardHeader>
                                <CardContent className='flex items-center space-x-4'>
                                  <Image
                                    src={component.image}
                                    alt={component.name}
                                    width={80}
                                    height={80}
                                    className='w-20 h-20 object-cover rounded-md'
                                  />
                                  <div>
                                    <p className='text-xl font-bold'>
                                      ${component.price}
                                    </p>
                                    <p className='text-sm text-muted-foreground'>
                                      {component.category}
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
          <div>
            <h2 className='text-2xl font-semibold mb-4'>Your Configuration</h2>
            <Droppable droppableId='selected'>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className='space-y-4'
                >
                  {selectedComponents.map((component, index) => (
                    <Draggable
                      key={component.id}
                      draggableId={component.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className='bg-secondary border-primary'
                        >
                          <CardHeader>
                            <CardTitle>{component.name}</CardTitle>
                          </CardHeader>
                          <CardContent className='flex items-center space-x-4'>
                            <Image
                              src={component.image}
                              alt={component.name}
                              width={80}
                              height={80}
                              className='w-20 h-20 object-cover rounded-md'
                            />
                            <div>
                              <p className='text-xl font-bold'>
                                ${component.price}
                              </p>
                              <p className='text-sm text-muted-foreground'>
                                {component.category}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className='mt-8'>
              <p className='text-2xl font-bold'>
                Total: ${totalPrice.toFixed(2)}
              </p>
              <Button className='mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90'>
                Save Configuration
              </Button>
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
