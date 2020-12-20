﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebAPi.Entities;

namespace WebAPi.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebAPi.Models.Customer", b =>
                {
                    b.Property<int>("CustomerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CustomerName")
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("CustomerId");

                    b.ToTable("Customeres");
                });

            modelBuilder.Entity("WebAPi.Models.Item", b =>
                {
                    b.Property<int>("ItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ItemName")
                        .HasColumnType("nvarchar(50)");

                    b.Property<decimal?>("ItemPrice")
                        .HasColumnType("decimal(18, 2)");

                    b.HasKey("ItemId");

                    b.ToTable("Itemes");
                });

            modelBuilder.Entity("WebAPi.Models.OrderDetails", b =>
                {
                    b.Property<long>("DetailsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("DetailsQuantity")
                        .HasColumnType("int");

                    b.Property<int?>("ItemId")
                        .HasColumnType("int");

                    b.Property<long?>("OrderId")
                        .HasColumnType("bigint");

                    b.HasKey("DetailsId");

                    b.HasIndex("ItemId");

                    b.HasIndex("OrderId");

                    b.ToTable("Details");
                });

            modelBuilder.Entity("WebAPi.Models.OrderMaster", b =>
                {
                    b.Property<long>("OrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CustomerId")
                        .HasColumnType("int");

                    b.Property<decimal?>("Gtotal")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<string>("OrderNo")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Pmethod")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("OrderId");

                    b.HasIndex("CustomerId");

                    b.ToTable("Masters");
                });

            modelBuilder.Entity("WebAPi.Models.OrderDetails", b =>
                {
                    b.HasOne("WebAPi.Models.Item", "Item")
                        .WithMany("OrderDetails")
                        .HasForeignKey("ItemId");

                    b.HasOne("WebAPi.Models.OrderMaster", "OrderMaster")
                        .WithMany("OrderDetails")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("WebAPi.Models.OrderMaster", b =>
                {
                    b.HasOne("WebAPi.Models.Customer", "Customer")
                        .WithMany("OrderMaster")
                        .HasForeignKey("CustomerId");
                });
#pragma warning restore 612, 618
        }
    }
}