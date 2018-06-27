import * as React from 'react';
import {Component, ReactElement} from 'react';
import * as Loadable from 'react-loadable';

export interface ComponentProps<T> {
  library: T;
}

export interface ImportedLibraryProps<T, K> {
  initial?: (library: T) => K;
  children: (library: T, state: K) => React.ReactNode;
}


export interface ImporterLibraryProps {
  error?: () => React.ReactNode;
  loading?: () => React.ReactNode;
}

export interface Options {
  loading?: React.ComponentType<any>
}

export type InternalProps<T, K> = ComponentProps<T> & ImportedLibraryProps<T, K>;
export type LibraryProps<T, K> = ImporterLibraryProps & ImportedLibraryProps<T, K>;

export class ImportedLibrary<T, K> extends Component<InternalProps<T, K>, K> {
  constructor(props: InternalProps<T, K>) {
    super(props);
    const {library, initial} = this.props;
    if (initial) {
      this.state = initial(library)
    }
  }

  render() {
    return (this.props.children as any)(this.props.library, this.state) || null;
  }
}


interface State {
  [key: string]: any
}

const nope = ():any => null;

export function importedLibrary<T, B=T>
(importer: () => Promise<T>, options: Options = {})
  : (<K extends State>(props: LibraryProps<B, K>) => ReactElement<any> | null) {
  return Loadable({
    loader: importer as any,
    loading: options.loading || nope,
    render: (library: any, props: LibraryProps<T, any>) => {
      return <ImportedLibrary {...props} library={library}/>;
    }
  }) as any;
}

export function importedLibraryDefault<T, B=T>
(importer: () => Promise<{ default: T }>, options: Options = {})
  : (<K extends State>(props: LibraryProps<B, K>) => ReactElement<any> | null) {
  return importedLibrary(() => importer().then(data => data.default), options);
}