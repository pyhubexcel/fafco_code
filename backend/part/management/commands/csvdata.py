# import csv
# from django.core.management.base import BaseCommand
# from django.core.exceptions import ValidationError
# from part.models import Partcsv

# class Command(BaseCommand):
#     help = 'Import data from a CSV file into Django models.'

#     def add_arguments(self, parser):
#         parser.add_argument('csv_file', type=str, help='Path to the CSV file')

#     def handle(self, *args, **kwargs):
#         csv_file_path = kwargs['csv_file']
        
#         # Try different encodings
#         encodings = ['utf-8', 'iso-8859-1', 'cp1252']
#         for encoding in encodings:
#             try:
#                 with open(csv_file_path, 'r', encoding=encoding) as file:
#                     reader = csv.DictReader(file)
#                     for row in reader:
#                         try:
#                             # Convert 'Active' field to boolean
#                             active_value = row['Active'].strip().upper()
#                             if active_value == 'TRUE':
#                                 active_value = True
#                             elif active_value == 'FALSE':
#                                 active_value = False
#                             else:
#                                 raise ValidationError("Invalid value for 'Active' field. It must be either 'True' or 'False'.")

#                             # Create Part instance
#                             model_instance = Partcsv(
#                                 part_number=row["Part Number"].strip(),
#                                 part_description=row["Part Description"].strip(),
#                                 product_line=row["Product Line"].strip(),
#                                 active=active_value
#                             )
#                             model_instance.full_clean() 
#                             model_instance.save()
#                         except ValidationError as ve:
#                             self.stderr.write(f'Validation error for row: {row}')
#                             self.stderr.write(f'Validation Error: {ve}')
#                         except Exception as e:
#                             self.stderr.write(f'Error saving row: {row}')
#                             self.stderr.write(f'Error: {e}')
#                 break  # Break the loop if successful
#             except FileNotFoundError:
#                 self.stderr.write(f'File not found: {csv_file_path}')
#                 return
#             except UnicodeDecodeError:
#                 continue  # Try next encoding
#         else:
#             self.stderr.write('Unable to decode CSV file using any of the specified encodings.')
#             return
        
#         self.stdout.write(self.style.SUCCESS('Data imported successfully.'))


import csv
from django.core.management.base import BaseCommand
from django.core.exceptions import ValidationError
from part.models import Partcsv

# class Command(BaseCommand):
#     help = 'Import data from a CSV file into Django models.'

#     def add_arguments(self, parser):
#         parser.add_argument('csv_file', type=str, help='Path to the CSV file')

#     def handle(self, *args, **kwargs):
#         csv_file_path = kwargs['csv_file']
        
#         # Try different encodings
#         encodings = ['utf-8', 'iso-8859-1', 'cp1252']
#         for encoding in encodings:
#             try:
#                 with open(csv_file_path, 'r', encoding=encoding) as file:
#                     reader = csv.DictReader(file)
#                     for row in reader:
#                         try:
#                             # Convert 'Active' field to boolean
#                             active_value = row['Active'].strip().upper()
#                             if active_value == 'TRUE':
#                                 active_value = True
#                             elif active_value == 'FALSE':
#                                 active_value = False
#                             else:
#                                 raise ValidationError("Invalid value for 'Active' field. It must be either 'True' or 'False'.")

#                             # Use update_or_create to update existing entries or create new ones
#                             part_number = row["Part Number"].strip()
#                             defaults = {
#                                 'part_description': row["Part Description"].strip(),
#                                 'product_line': row["Product Line"].strip(),
#                                 'active': active_value
#                             }
#                             obj, created = Partcsv.objects.update_or_create(
#                                 part_number=part_number,
#                                 defaults=defaults
#                             )
#                             if created:
#                                 self.stdout.write(f'Created new Partcsv: {part_number}')
#                             else:
#                                 self.stdout.write(f'Updated Partcsv: {part_number}')
#                         except ValidationError as ve:
#                             self.stderr.write(f'Validation error for row: {row}')
#                             self.stderr.write(f'Validation Error: {ve}')
#                         except Exception as e:
#                             self.stderr.write(f'Error processing row: {row}')
#                             self.stderr.write(f'Error: {e}')
#                 break  # Break the loop if successful
#             except FileNotFoundError:
#                 self.stderr.write(f'File not found: {csv_file_path}')
#                 return
#             except UnicodeDecodeError:
#                 print("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
#                 continue  # Try next encoding
#         else:
#             self.stderr.write('Unable to decode CSV file using any of the specified encodings.')
#             return
        
#         self.stdout.write(self.style.SUCCESS('Data imported successfully.'))

class Command(BaseCommand):
    help = 'Import data from a CSV file into Django models.'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file')

    def handle(self, *args, **kwargs):
        csv_file_path = kwargs['csv_file']
        
        # Track the part numbers in the CSV
        csv_part_numbers = set()
        
        # Try different encodings
        encodings = ['utf-8', 'iso-8859-1', 'cp1252']
        for encoding in encodings:
            try:
                with open(csv_file_path, 'r', encoding=encoding) as file:
                    reader = csv.DictReader(file)
                    for row in reader:
                        try:
                            # Convert 'Active' field to boolean
                            active_value = row['Active'].strip().upper()
                            if active_value == 'TRUE':
                                active_value = True
                            elif active_value == 'FALSE':
                                active_value = False
                            else:
                                raise ValidationError("Invalid value for 'Active' field. It must be either 'True' or 'False'.")

                            # Track the part number
                            part_number = row["Part Number"].strip()
                            csv_part_numbers.add(part_number)
                            
                            # Use update_or_create to update existing entries or create new ones
                            defaults = {
                                'part_description': row["Part Description"].strip(),
                                'product_line': row["Product Line"].strip(),
                                'active': active_value
                            }
                            obj, created = Partcsv.objects.update_or_create(
                                part_number=part_number,
                                defaults=defaults
                            )
                            if created:
                                self.stdout.write(f'Created new Partcsv: {part_number}')
                            else:
                                self.stdout.write(f'Updated Partcsv: {part_number}')
                        except ValidationError as ve:
                            self.stderr.write(f'Validation error for row: {row}')
                            self.stderr.write(f'Validation Error: {ve}')
                        except Exception as e:
                            self.stderr.write(f'Error processing row: {row}')
                            self.stderr.write(f'Error: {e}')
                break  # Break the loop if successful
            except FileNotFoundError:
                self.stderr.write(f'File not found: {csv_file_path}')
                return
            except UnicodeDecodeError:
                continue  # Try next encoding
        else:
            self.stderr.write('Unable to decode CSV file using any of the specified encodings.')
            return
        
        # Remove parts from the database that are not in the CSV
        database_part_numbers = set(Partcsv.objects.values_list('part_number', flat=True))
        parts_to_delete = database_part_numbers - csv_part_numbers
        
        if parts_to_delete:
            Partcsv.objects.filter(part_number__in=parts_to_delete).delete()
            self.stdout.write(f'Removed Partcsv: {", ".join(parts_to_delete)}')

        self.stdout.write(self.style.SUCCESS('Data imported successfully.'))
