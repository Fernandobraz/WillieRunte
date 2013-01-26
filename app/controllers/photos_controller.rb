class PhotosController < ApplicationController
  before_filter :find_book
  # GET /photos
  # GET /photos.json
  def index
    @photos = @book.photos
  end

  # GET /photos/1
  # GET /photos/1.json
  def show
    @photo = Photo.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @photo }
    end
  end

  # GET /photos/new
  # GET /photos/new.json
  def new
    @photo = Photo.new
  end

  # GET /photos/1/edit
  def edit
    @photo = Photo.find(params[:id])
  end

  # POST /photos
  # POST /photos.json
  def create
    @photo = Photo.new(params[:photo])
    @photo.book = @book
    if @photo.save
      redirect_to book_photos_path(@book)
    else
      render action: "new"
    end
  end

  def bigger
    @photo = Photo.find(params[:id]) if params[:id]
  end

  # PUT /photos/1
  # PUT /photos/1.json
  def update
    @photo = Photo.find(params[:id])
    if @photo.update_attributes(params[:photo])
      redirect_to book_photos_path(@book), notice: 'Photo saved successfully'
    else
      render action: "edit"
    end
  end

  # DELETE /photos/1
  # DELETE /photos/1.json
  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy
    redirect_to book_photos_path(@book), notice: "Photo deleted successfully"
  end

  private
    def find_book
      @book = Book.find(params[:book_id]) if params[:book_id]
    end
end
