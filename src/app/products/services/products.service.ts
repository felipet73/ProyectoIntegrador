import { computed, inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from 'src/app/supabase/supabase.service';

import { Empresa } from '@store-front/components/interfaces/empresa.interface';
import { Product } from '@products/interfaces/product.interface';


@Injectable({ providedIn: 'root' })
export class ProductsService {
  private _producto = signal<Product | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));
  private supabaseService:SupabaseService = inject(SupabaseService);
  producto  = computed(() => this._producto());
  token = computed(this._token);
  public miEmpresa:Empresa|null  = JSON.parse(localStorage.getItem('MiEmpresa') || "") || null;
  public acutualEmpresa:Empresa|null  = JSON.parse(localStorage.getItem('ActualEmpresa') || "") || null;
  constructor() {}

  // Obtener todos
  async getAllProductos(): Promise<Product[]> {
    const { data, error } = await this.supabaseService.client.from('productos').select('*').eq('id_empresa', this.acutualEmpresa?.id || "");
    if (error) throw error;
    return data as Product[];
  }

  // Obtener producto por id
  async getProductoPorId(id: string): Promise<Product | null> {
    const { data, error } = await this.supabaseService.client.from('productos').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Product;
  }

  async getProductoPorCodigoBarras(id: string): Promise<Product | null> {
    const { data, error } = await this.supabaseService.client.from('productos').select('*').eq('codigo_barras', id).single();
    if (error) throw error;
    return data as Product;
  }


  // Insertar nuevo producto
  async nuevoProucto(producto: Product): Promise<Product> {

    var { data, error } = await this.supabaseService.client.rpc('get_next_producto_id');
    if (error) throw error;
    console.log("Siguiente ID:", data);

    producto.id = data;
    /*if (!producto.tipo || producto.tipo === '') producto.tipo = 'CLIENTE';
    if (!producto.fecha_registro) producto.fecha_registro = new Date();*/
    var { data, error } = await this.supabaseService.client
      .from('productos')
      .insert([producto])
      .select()
      .single();
    if (error) throw error;
    return data as Product;
  }

  // Modifica producto por id
  async editarProducto(id: number, producto: Partial<Product>): Promise<Product> {
    const { data, error } = await this.supabaseService.client
      .from('productos')
      .update(producto)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Product;
  }

  // Eliminar producto por id
  async eliminarProducto(id: number): Promise<void> {
    const { error } = await this.supabaseService.client
      .from('productos')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }



}











/*import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import {
  Gender,
  Product,
  ProductsResponse,
} from '@products/interfaces/product.interface';
import {
  delay,
  forkJoin,
  map,
  Observable,
  of,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

const emptyProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User,
};

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  private productsCache = new Map<string, ProductsResponse>();
  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`; // 9-0-''
    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender,
        },
      })
      .pipe(
        tap((resp) => console.log(resp)),
        tap((resp) => this.productsCache.set(key, resp))
      );
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    if (this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!);
    }

    return this.http
      .get<Product>(`${baseUrl}/products/${idSlug}`)
      .pipe(tap((product) => this.productCache.set(idSlug, product)));
  }

  getProductById(id: string): Observable<Product> {
    if (id === 'new') {
      return of(emptyProduct);
    }

    if (this.productCache.has(id)) {
      return of(this.productCache.get(id)!);
    }

    return this.http
      .get<Product>(`${baseUrl}/products/${id}`)
      .pipe(tap((product) => this.productCache.set(id, product)));
  }

  updateProduct(
    id: number,
    productLike: Partial<Product>,
    imageFileList?: FileList
  ): Observable<Product> {
    const currentImages = productLike.images ?? [];

    return this.uploadImages(imageFileList).pipe(
      map((imageNames) => ({
        ...productLike,
        images: [...currentImages, ...imageNames],
      })),
      switchMap((updatedProduct) =>
        this.http.patch<Product>(`${baseUrl}/products/${id}`, updatedProduct)
      ),
      tap((product) => this.updateProductCache(product))
    );

    // return this.http
    //   .patch<Product>(`${baseUrl}/products/${id}`, productLike)
    //   .pipe(tap((product) => this.updateProductCache(product)));
  }

  createProduct(
    productLike: Partial<Product>,
    imageFileList?: FileList
  ): Observable<Product> {
    return this.http
      .post<Product>(`${baseUrl}/products`, productLike)
      .pipe(tap((product) => this.updateProductCache(product)));
  }

  updateProductCache(product: Product) {
    const productId = product.id;

    this.productCache.set(productId, product);

    this.productsCache.forEach((productResponse) => {
      productResponse.products = productResponse.products.map(
        (currentProduct) =>
          currentProduct.id === productId ? product : currentProduct
      );
    });

    console.log('Caché actualizado');
  }

  // Tome un FileList y lo suba
  uploadImages(images?: FileList): Observable<string[]> {
    if (!images) return of([]);

    const uploadObservables = Array.from(images).map((imageFile) =>
      this.uploadImage(imageFile)
    );

    return forkJoin(uploadObservables).pipe(
      tap((imageNames) => console.log({ imageNames }))
    );
  }

  uploadImage(imageFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', imageFile);

    return this.http
      .post<{ fileName: string }>(`${baseUrl}/files/product`, formData)
      .pipe(map((resp) => resp.fileName));
  }
}*/
