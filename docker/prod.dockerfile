FROM mcr.microsoft.com/dotnet/core/aspnet AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk AS build
WORKDIR /src

RUN sed -i 's/DEFAULT@SECLEVEL=2/DEFAULT@SECLEVEL=1/g' /etc/ssl/openssl.cnf
RUN sed -i 's/DEFAULT@SECLEVEL=2/DEFAULT@SECLEVEL=1/g' /usr/lib/ssl/openssl.cnf

COPY ["../UserManagementApi/UserManagementApi.csproj", "./"]
RUN dotnet restore "./UserManagementApi.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "../UserManagementApi/UserManagementApi.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "../UserManagementApi/UserManagementApi.csproj" -c Release -o /app

FROM base AS final
ENV  ASPNETCORE_URLS=http://*:5000
EXPOSE 5000
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "UserManagementApi.dll"]

## Instructions

# 1. Run docker build -t aspnetapimovie -f prod.dockerfile .
# 2. Run docker run -p 8080:5000 aspnetapimovie
