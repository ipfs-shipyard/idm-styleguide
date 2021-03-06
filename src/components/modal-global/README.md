# Global modal

A global modal react provider. You can open and close modals imperatively (i.e. separately from the Component `render` function).

## Usage

**Setup `<ModalGlobalProvider />`:**

```jsx
import { ModalGlobalProvider } from '@nomios/web-uikit'

<ModalGlobalProvider>
    <App />
</ModalGlobalProvider>
```

**With `withModalGlobal()` HOC:**

```jsx
import { withModalGlobal, Modal, ModalClose, Button } from '@nomios/web-uikit';
import { Transition } from 'react-transition-group';

const FadeModal = ({ children, ...rest }) => (
    <Modal { ...rest }>
        <Transition timeout={ 300 }>
            { (state) => (
                <div style={ {
                    ...{ padding: '5rem', transition: 'opacity 300ms ease-in-out' },
                    ...{ opacity: state === 'entering' || state === 'entered' ? 1 : 0 },
                } }>
                    <ModalClose />
                    I'm a text in a modal.
                </div>
            ) }
        </Transition>
    </Modal>
);

const WrappedComponent = withModalGlobal(({ globalModal: { openModal } }) => (
    <Button onClick={ () => openModal(<FadeModal />) }>
        Open Modal Imperatively
    </Button>
));
```

**With `<ModalGlobalConsumer>` component:**

```jsx
import { ModalGlobalConsumer, Modal, ModalClose, Button } from '@nomios/web-uikit';

const FadeModal = ({ children, ...rest }) => (
    <Modal { ...rest }>
        <Transition timeout={ 300 }>
            { (state) => (
                <div style={ {
                    ...{ padding: '5rem', transition: 'opacity 300ms ease-in-out' },
                    ...{ opacity: state === 'entering' || state === 'entered' ? 1 : 0 },
                } }>
                    <ModalClose />
                    I'm a text in a modal.
                </div>
            ) }
        </Transition>
    </Modal>
);

const MyComponent = () => {
    return (
        <ModalGlobalConsumer>
            { ({ openModal }) => (
                <Button onClick={ () => openModal(<FadeModal />) }>
                    Open Modal Imperatively
                </Button>
            ) }
        </ModalGlobalConsumer>
    )
};
```

## API

### ModalGlobalProvider

This component uses [react context api](https://reactjs.org/docs/context.html) and it will provide one object (`globalModal`) to its consumers. The object has two functions:

- `closeModal()`   
This function receives the modal component to be closed.

- `openModal(component)`   
This function receives the modal component to be opened.

**Note:** You must instantiate the provider up higher in your react tree.

### ModalGlobalConsumer

The `<ModalGlobalConsumer>` component allows you to trigger a modal imperatively by providing a children render prop with the `globalModal` object prop with two functions:

- `closeModal()`

- `openModal(component)`

### withModalGlobal(component)

The HOC version of the <ModalGlobalConsumer> component. The injected prop is exactly the same of the <ModalGlobalConsumer> children render prop. `globalModal` with the same two functions:

- `closeModal()`

- `openModal(component)`
